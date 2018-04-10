'use strict';

const Order = require('../models/order');
const ResponseUtil = require('../utils/response');

function change(orderId, callback) {
    //TODO validate if User is a retailer
    Order.findById(orderId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());

        if (result.payment.type === 'bill') {
            result.totalPrice = round(result.totalPrice * 0.5, 0.05);
            result.items.forEach(function (item) {
                item.product.price = round(item.product.price * 0.5, 0.05);
            });
            result.save();
        } else {
            return callback(ResponseUtil.createErrorResponse('Expected payment type: bill'));
        }

        result = {'order': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function round(value, step) {
    if (!step) step = 1.0;
    let inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

module.exports = {
    change
};
