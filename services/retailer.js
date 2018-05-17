'use strict';

const Order = require('../models/order');
const ResponseUtil = require('../utils/response');

function change(orderId, callback) {
    Order.findById(orderId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No order found.'));

        if (result.payment.type === 'bill') {
            result.totalPrice = (result.totalPrice * 0.5).toFixed(2);
            result.items.forEach(function (item) {
                item.product.price = (item.product.price * 0.5).toFixed(2);
            });
            result.save(function(error, result) {
                if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                if (!result) return callback(ResponseUtil.createNotFoundResponse('No order found.'));
                result = {'order': result};
                return callback(null, ResponseUtil.createSuccessResponse(result, 'Order successfully updated.'));
            });
        } else {
            return callback(ResponseUtil.createErrorResponse('Expected payment type: bill'));
        }
    });
}

module.exports = {
    change
};
