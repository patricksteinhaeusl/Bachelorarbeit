'use strict';

const Order = require('../models/order');
const OrderTemp = require('../models/orderTemp');
const DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;
const CreditCard = require('../models/creditCard').CreditCard;
const ResponseUtil = require('../utils/response');

function get(orderId, callback) {
    Order.findById(orderId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No order found.'));
        result = {'order': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getByAccountId(accountId, callback) {
    Order
        .find({_account: accountId})
        .sort({'createdAt': -1})
        .exec(function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('No order found.'));
            result = {'orders': result};
            return callback(null, ResponseUtil.createSuccessResponse(result));
        });
}

function getTempByAccountId(accountId, callback) {
    OrderTemp.findOne({_account: accountId}, {}, { sort: { 'createdAt' : -1 } }, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'order': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function createTemp(items, totalPrice, account, callback) {
    DeliveryAddress.findOne({_account: account}, function(error, deliveryAddress) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        CreditCard.findOne({_account: account}, function(error, creditCard) {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            let orderObj;
            if (creditCard && deliveryAddress) {
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
            } else if(!creditCard && deliveryAddress) {
                orderObj = new OrderTemp({
                    items: items,
                    totalPrice: totalPrice,
                    _account: account,
                    _deliveryAddress: deliveryAddress._id,
                    payment: {
                        type: 'bill',
                    }
                });
            } else if(creditCard && !deliveryAddress) {
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
                orderObj = new OrderTemp({
                    items: items,
                    totalPrice: totalPrice,
                    _account: account,
                });
            }

            orderObj.validate(function(error) {
                if (error) return callback(ResponseUtil.createValidationResponse(error));
                orderObj.save(function(error, result) {
                    if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                    if (!result) return callback(ResponseUtil.createNotFoundResponse('Order failed to create.'));
                    result = {'order': result};
                    return callback(null, ResponseUtil.createSuccessResponse(result));
                });
            });
        });
    });
}

function updateTemp(order, callback) {
    let orderObj = new OrderTemp(order);
    orderObj.validate(function(error) {
        if (error) return callback(ResponseUtil.createValidationResponse(error));
        OrderTemp.findByIdAndUpdate(orderObj._id, orderObj, {new: true}, function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Order failed to update.'));
            result = {'order': result};
            return callback(null, ResponseUtil.createSuccessResponse(result));
        });
    });
}

function insert(order, callback) {
    let orderObj = new Order(order);
    orderObj.validate(function(error) {
        if (error) return callback(ResponseUtil.createValidationResponse(error));
        orderObj.save(function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Order failed to create.'));
            result = {'order': result};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Order successfully saved.'));
        });
    });
}

function remove(orderId, callback) {
    Order.findByIdAndRemove(orderId, function (error) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Order successfully removed'));
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
