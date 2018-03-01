'use strict';

const LogUtil = require('../utils/log');
const AccountData = require('./account');
const ProductData = require('./product');
const PostData = require('./post');
const OrderData = require('./order');

let data = {
  drop: function(callback) {
    OrderData.drop(function() {
      AccountData.drop(function() {
        ProductData.drop(function() {
          PostData.drop(function() {
            LogUtil.writeInfo('Collections dropped');
            return callback();
          });
        });
      });
    });
  },
  create: function(callback) {
    OrderData.create(function() {
      AccountData.create(function() {
        ProductData.create(function() {
          PostData.create(function() {
            LogUtil.writeInfo('Collections created');
            return callback();
          });
        });
      });
    });
  }
};

module.exports = data;
