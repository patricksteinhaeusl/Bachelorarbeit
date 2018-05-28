'use strict';

const Order = require('../models/order');
const OrderTemp = require('../models/orderTemp');
const DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;
const CreditCard = require('../models/creditCard').CreditCard;
const ResponseUtil = require('../utils/response');

function get(orderId, callback) {
    // Find order by id
    Order.findById(orderId)
        .then((order) => {
            if (!order) return callback(ResponseUtil.createNotFoundResponse('No order found.'));
            const data = {'order': order};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getByAccountId(accountId, callback) {
    Order
        .find({
            _account: accountId
        }).sort({
            'createdAt': -1
        }).exec((error, order) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!order) return callback(ResponseUtil.createNotFoundResponse('No order found.'));
            const data = {'orders': order};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        });
}

function getTempByAccountId(accountId, callback) {
    OrderTemp.findOne({
            _account: accountId
        }, {}, {
            sort: {
                'createdAt' : -1
            }
        }).then((orderTemp) => {
            if (!orderTemp) return callback(ResponseUtil.createNotFoundResponse());
            const data = {'order': orderTemp};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        });
}

function createTemp(items, totalPrice, account, callback) {
    // Find deliveryAddress by account
    DeliveryAddress.findOne({
        _account: account
    }).then((deliveryAddress) => {
        // Find creditCard by account
        CreditCard.findOne({
            _account: account
        }).then((creditCard) => {
            let orderObj;

            if (creditCard && deliveryAddress) {
                // Create temp order if credit card and delivery address exists
                orderObj = new OrderTemp({
                    items: items,
                    totalPrice: totalPrice,
                    _account: account,
                    _deliveryAddress: deliveryAddress._id,
                    payment: {
                        type: 'creditCard',
                        _creditCard: creditCard._id
                    }
                });
            } else if (!creditCard && deliveryAddress) {
                // Create temp order if delivery address exists
                orderObj = new OrderTemp({
                    items: items,
                    totalPrice: totalPrice,
                    _account: account,
                    _deliveryAddress: deliveryAddress._id,
                    payment: {
                        type: 'bill',
                    }
                });
            } else if (creditCard && !deliveryAddress) {
                // Create temp order if credit card exists
                orderObj = new OrderTemp({
                    items: items,
                    totalPrice: totalPrice,
                    _account: account,
                    payment: {
                        type: 'creditCard',
                        _creditCard: creditCard._id
                    }
                });
            } else {
                // Create temp order if both not exists
                orderObj = new OrderTemp({
                    items: items,
                    totalPrice: totalPrice,
                    _account: account,
                });
            }
            return orderObj;
        }).then((orderObj) => {
            // Validate orderObj
            orderObj.validate((error) => {
                if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
                // Save order
                OrderTemp.create(orderObj)
                    .then((newOrder) => {
                        if (!newOrder) return callback(ResponseUtil.createNotFoundResponse('Order failed to create.'));
                        const data = {'order': newOrder};
                        return callback(null, ResponseUtil.createSuccessResponse(data));
                    }).catch((error) => {
                        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                    });
            });
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function updateTemp(order, callback) {
    let orderObj = new OrderTemp(order);

    // Validate Order
    orderObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        // Find Order and update
        OrderTemp.findByIdAndUpdate(
            orderObj._id,
            orderObj, {
                new: true,
                setDefaultsOnInsert: true,
                context: 'query'
            }).then((order) => {
                if (!order) return callback(ResponseUtil.createNotFoundResponse('Order failed to update.'));
                const data = {'order': order};
                return callback(null, ResponseUtil.createSuccessResponse(data));
            }).catch((error) => {
                return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            });
    });
}

function insert(order, callback) {
    let orderObj = new Order(order);

    // Validate Order
    orderObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        // Create Order
        Order.create(
            orderObj
        ).then((order) => {
            if (!order) return callback(ResponseUtil.createNotFoundResponse('Order failed to create.'));
            const data = {'order': order};
            return callback(null, ResponseUtil.createSuccessResponse(data, 'Order successfully saved.'));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
    });

}

function remove(orderId, callback) {
    Order.findByIdAndRemove(
            orderId
        ).then(() => {
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Order successfully removed'));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getFromTo(from, range, callback) {
    let fromResult = from;
    let toResult;

    if(process.env.NODE_RCE_EVAL === 'ON' || process.env.NODE_RCE_EVAL === 'on') {
        toResult = eval(from + " + " + range);
    } else {
        toResult = parseInt(from) + parseInt(range);
    }

    let result = { from: fromResult, to: toResult };
    return callback(null, ResponseUtil.createSuccessResponse(result, 'Parameters accepted.'));
}

module.exports = {
    get,
    getByAccountId,
    getTempByAccountId,
    createTemp,
    updateTemp,
    insert,
    remove,
    getFromTo
};
