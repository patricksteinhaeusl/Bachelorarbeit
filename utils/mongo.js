'use strict';

const LogUtil = require('../utils/log');
const GlobalConfig = require('../configs/index');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(GlobalConfig.mongo.connectionString(), function(error) {
    if(error) {
        LogUtil.writeError(error);
        process.exit(0);
    }
    LogUtil.writeInfo('Databse connection successfully!');
});

let util = mongoose.connection;

util.on('disconnecting', function () {
    LogUtil.writeError('Database disconnecting...');
});

util.on('disconnected', function () {
    LogUtil.writeError('Database disconnected!');
});

util.on('connected', function () {
    LogUtil.writeInfo('Database connected!');
});

util.on('connecting', function () {
    LogUtil.writeInfo('Database connecting...');
});

module.exports = util;
