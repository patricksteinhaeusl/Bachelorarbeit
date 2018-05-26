'use strict';

const Order = require('../models/order');
const ResponseUtil = require('../utils/response');

function applyDiscount(orderId, callback) {
    // Find order by id
    Order.findById(orderId)
        .then((order) => {
            // Discount on order
            if (!order || !order.length) return callback(ResponseUtil.createNotFoundResponse('No order found.'));

            if (order.payment.type === 'bill') {
                order.totalPrice = (order.totalPrice * 0.5).toFixed(2);
                order.items.forEach((item) => {
                    item.product.price = (item.product.price * 0.5).toFixed(2);
                });
                return order;
            }
            return callback(ResponseUtil.createErrorResponse('Expected payment type: bill'));
        }).then((order) => {
            // Save Order
            Order.create(order).then((newOrder) => {
                if (!newOrder || !newOrder.length) return callback(ResponseUtil.createNotFoundResponse('No order found.'));
                let data = {'order': newOrder};
                return callback(null, ResponseUtil.createSuccessResponse(data, 'Order successfully updated.'));
            }).catch((error) => {
                if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            });
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

module.exports = {
    applyDiscount
};
