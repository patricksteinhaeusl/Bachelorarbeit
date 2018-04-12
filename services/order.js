'use strict';

const Order = require('../models/order');
const ResponseUtil = require('../utils/response');

function get(orderId, callback) {
    Order.findById(orderId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'order': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getByAccountId(accountId, callback) {
    Order
        .find({_account: accountId})
        .sort({'createdAt': -1})
        .exec(function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error));
            if (!result) return callback(ResponseUtil.createNotFoundResponse());
            result = {'orders': result};
            return callback(null, ResponseUtil.createSuccessResponse(result));
        });
}

function update(order, callback) {
    let orderObj = new Order(order);
    Order.findByIdAndUpdate(orderObj._id, orderObj, {new: true}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'order': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function insert(order, callback) {
    let orderObj = new Order(order);
    orderObj.save(function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'order': result};
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Order successfully created.'));
    });
}

function create(callback) {
    let orderObj = new Order();
    let result = {order: orderObj};
    return callback(null, ResponseUtil.createSuccessResponse(result));
}

function remove(orderId, callback) {
    Order.findByIdAndRemove(orderId, function (error) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getFromTo(from, range, callback) {
    let fromResult = from;
    let toResult;

    if(process.env.NODE_RCE === 'OFF' || process.env.NODE_RCE === 'off') {
        toResult = parseInt(from) + parseInt(range);
    } else {
        toResult = eval(from + " + " + range);
    }

    let result = { from: fromResult, to: toResult };
    callback(result);
}

module.exports = {
    get,
    getByAccountId,
    update,
    insert,
    create,
    remove,
    getFromTo
};
