'use strict';

const LogUtil = require('../utils/log');
const GlobalConfig = require('../configs/index');
const Data = require('../data/index');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let util = mongoose.connect(GlobalConfig.mongo.connectionString(), { useMongoClient: true });

util.on('error', function() {
  LogUtil.writeError('Database connection failed');
});

util.once('open', function() {
  LogUtil.writeInfo('Database connection successfully');
  Data.drop(function() {
    Data.create(function() {
      LogUtil.writeInfo('Database prepared');
    });
  });
});

module.exports = util;