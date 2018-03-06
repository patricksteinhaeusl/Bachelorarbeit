'use strict';

const LogUtil = require('../utils/log');
const GlobalConfig = require('../configs/index');
const Data = require('../data/index');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(GlobalConfig.mongo.connectionString());

let util = mongoose.connection;

util.on('disconnecting', function () {
    LogUtil.writeError('Database disconnecting...');
});

util.on('disconnected', function () {
    LogUtil.writeError('Database disconnected!');
});

util.on('connected', function () {
    LogUtil.writeError('Database connected!');
});

util.on('connecting', function () {
    LogUtil.writeError('Database connecting...');
});

util.once('open', function() {
    Data.drop(function () {
        Data.create(function () {
            LogUtil.writeInfo('Database prepared');
        });
    });
});

module.exports = util;
