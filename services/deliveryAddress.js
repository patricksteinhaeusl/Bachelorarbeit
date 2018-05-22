'use strict';

const Account = require('../models/account');
const DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;
const ResponseUtil = require('../utils/response');

function get(deliveryAddressId, accountId, callback) {
    DeliveryAddress.findOne({_id: deliveryAddressId, _account: accountId}, (error, result) => {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No delivery address found.'));
        result = {'deliveryAddress': result};
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Delivery address found.'));
    });
}

function getByAccountId(accountId, callback) {
    DeliveryAddress.find({_account: accountId}, (error, result) => {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No delivery address found.'));
        result = {'deliveryAddresses': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function update(deliveryAddress, callback) {
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
    deliveryAddressObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        DeliveryAddress.findByIdAndUpdate(deliveryAddressObj._id, deliveryAddressObj, {
            new: true,
            runValidators: true,
            context: 'query'
        }, (error, result) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to update.'));
            result = {'deliveryAddress': result};
            return callback(null, ResponseUtil.createSuccessResponse(result));
        });
    });
}

function insert(deliveryAddress, callback) {
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
    deliveryAddressObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        deliveryAddressObj.save((error, result) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
            result = {'deliveryAddress': result};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Delivery address successfully created.'));
        });
    });
}

function insertByAccount(account, deliveryAddress, callback) {
    let accountObj = new Account(account);
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
    deliveryAddressObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        Account.findById(accountObj._id, (error, result) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
            deliveryAddressObj.owner = result._id;
            deliveryAddressObj.save((error, result) => {
                if (error) return callback(ResponseUtil.createErrorResponse(error));
                if (!result) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
                result = {'deliveryAddress': result};
                return callback(null, ResponseUtil.createSuccessResponse(result, 'Delivery address successfully created.'));
            });
        });
    });
}

function remove(deliveryAddressId, callback) {
    DeliveryAddress.findByIdAndRemove(deliveryAddressId, (error) => {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        return callback(null, ResponseUtil.createSuccessResponse(null, 'Delivery address successfully deleted.'));
    });
}

module.exports = {
    get,
    getByAccountId,
    update,
    insert,
    insertByAccount,
    remove
};
