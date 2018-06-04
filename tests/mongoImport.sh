#!/bin/bash
DataFilePath="./data"
DBPath="/tmp/mongodb/data/db"
MongoLogPath="/dev/null"
DBName="webshop"

mkdir -p $DBPath
#Create MongoDB User and Roles
mongod --dbpath $DBPath --fork --logpath $MongoLogPath --noauth
mongo < ./docker_config/configure.js

#Import all JSON Files
ls -1 $DataFilePath/*.json | xargs -n1 basename | sed 's/.json$//' | while read col;
    do mongoimport -d $DBName -c $col < $DataFilePath/$col.json --upsert --jsonArray;
done && \

#Shutdown clean
mongo admin --eval 'db.shutdownServer()' && \
mongod --dbpath $DBPath --fork --logpath $MongoLogPath --auth