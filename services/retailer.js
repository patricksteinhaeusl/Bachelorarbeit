'use strict';

const Order = require('../models/order');
const ResponseUtil = require('../utils/response');

function change(orderId, callback) {
    Order.findById(orderId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());

        console.log(result);

        if (result.payment.type === 'bill') {
            result.totalPrice = (result.totalPrice * 0.5).toFixed(2);
            result.items.forEach(function (item) {
                item.product.price = (item.product.price * 0.5).toFixed(2);
            });
            console.log(result);
            result.save();
        } else {
            return callback(ResponseUtil.createErrorResponse('Expected payment type: bill'));
        }

        result = {'order': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

module.exports = {
    change
};
