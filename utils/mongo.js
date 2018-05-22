'use strict';

const LogUtil = require('../utils/log');
const GlobalConfig = require('../configs/index');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(GlobalConfig.mongo.connectionString(), (error) => {
    if(error) {
        LogUtil.writeError(error);
        process.exit(0);
    }
    LogUtil.writeInfo('Databse connection successfully!');
});

let util = mongoose.connection;

util.on('disconnecting', () => {
    LogUtil.writeError('Database disconnecting...');
});

util.on('disconnected', () => {
    LogUtil.writeError('Database disconnected!');
});

util.on('connected', () => {
    LogUtil.writeInfo('Database connected!');
});

util.on('connecting', () => {
    LogUtil.writeInfo('Database connecting...');
});

module.exports = util;
