'use strict';

const LogUtil = require('../utils/log');
const Order = require('../models/order');

let data = {
    drop: function (callback) {
        Order.remove({}, function (err) {
            if (err) LogUtil.writeError(err);
            LogUtil.writeInfo('Order removed');
            return callback();
        });
    },
    create: function (callback) {
        return callback();
    }
};

module.exports = data;
