# DOCKER-VERSION 17.12.0-ce

# ---- Base ----
FROM node:alpine as base

#Define where our app lives
WORKDIR /app

# Set node environment variable for production or development mode
ENV NODE_ENV production

# Install app dependencies
COPY package.json yarn.*lock ./
RUN yarn install --non-interactive

#Install MongoDB, create Data Directory and set Permissions for User Node
RUN apk --no-cache add \
	mongodb \
	mongodb-tools && \ 
	mkdir -p /data/db 

# Add necessary docker assets and import DB
COPY data ./data
COPY docker_config/configure.js .
COPY docker_config/run_all /utils/scripts/
COPY docker_config/mongodb_import /utils/scripts/
COPY docker_config/mongodb /utils/services/
COPY docker_config/node /utils/services/
RUN chmod -R 755 /utils && /utils/scripts/mongodb_import
RUN rm -rf /data/db/journal/

# ---- Release ----
FROM node:alpine AS final

#Define where our app lives
WORKDIR /app

# Install MongoDB
RUN apk --no-cache add mongodb

# Copy node_modules,db and scripts to final image
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /data/db /data/db
COPY --from=base /utils /utils

# Bundle app source code
COPY . .

# Expose this Docker on following port to the outside world
EXPOSE 3000

# Set our run_all script as entrypoint
ENTRYPOINT ["/utils/scripts/run_all"]