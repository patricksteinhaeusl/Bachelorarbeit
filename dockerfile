# ---- Base Stage ----
FROM node:alpine as base

#Define where our app lives
WORKDIR /app

# Install node_modules
COPY package.json yarn.*lock ./
RUN yarn install --production=true --non-interactive

#Install MongoDB, create Data Directory and set Permissions for User Node
RUN apk --no-cache add \
    mongodb \
    mongodb-tools && \
    mkdir -p /data/db

# Add temporary necessary docker assets and import DB
COPY data ./data
COPY docker_config/configure.js .
COPY docker_config/run_all /utils/scripts/
COPY docker_config/mongodb_import /utils/scripts/
COPY docker_config/mongodb /utils/services/
COPY docker_config/node /utils/services/
RUN chmod -R 755 /utils && /utils/scripts/mongodb_import
RUN rm -rf /data/db/journal/

# ---- Release Stage ----
FROM node:alpine AS final

#Define where our app lives
WORKDIR /app

# Set variables for production/development mode and turning on/off RCE and Serialization Bugs
ENV NODE_ENV production
ENV NODE_RCE_EVAL off
ENV NODE_RCE_SERIALIZATION off

# Install MongoDB
RUN apk --no-cache add mongodb

# Copy node_modules, db and scripts to final image
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /data/db /data/db
COPY --from=base /utils /utils

# Bundle app source code and delete not needed docker assets
COPY . .
RUN rm -rf ./dockerfile  ./docker_config

# Expose this Docker on following ports to the outside world
EXPOSE 80 443

# Set our run_all script as entrypoint
ENTRYPOINT ["/utils/scripts/run_all"]