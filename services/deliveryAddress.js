'use strict';

const Account = require('../models/account');
const DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;
const ResponseUtil = require('../utils/response');

function get(deliveryAddressId, accountId, callback) {
    // Find delivery address by id and accountId
    DeliveryAddress.findOne({
        _id: deliveryAddressId,
        _account: accountId
    }).then((deliveryAddress) => {
        if (!deliveryAddress) return callback(ResponseUtil.createNotFoundResponse('No delivery address found.'));
        const data = {'deliveryAddress': deliveryAddress};
        return callback(null, ResponseUtil.createSuccessResponse(data));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function getByAccountId(accountId, callback) {
    // Find delivery addresses by accountId
    DeliveryAddress.find({
        _account: accountId
    }).then((deliveryAddresses) => {
        if (!deliveryAddresses.length) return callback(ResponseUtil.createNotFoundResponse('No delivery address found.'));
        const data = {'deliveryAddresses': deliveryAddresses};
        return callback(null, ResponseUtil.createSuccessResponse(data));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function update(deliveryAddress, callback) {
    // Update delivery address by id
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);

    // Find and Update delivery address by id
    DeliveryAddress.findByIdAndUpdate(deliveryAddressObj._id, deliveryAddressObj, {
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true,
        context: 'query'
    }).then((deliveryAddress) => {
        if (!deliveryAddress) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to update.'));
        const data = {'deliveryAddress': deliveryAddress};
        return callback(null, ResponseUtil.createSuccessResponse(data, 'Delivery address successfully updated.'));
    }).catch((error) => {
        // Validate delivery address
        if (error.errors) return callback(ResponseUtil.createValidationResponse(error.errors));
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function insert(deliveryAddress, callback) {
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);

    handleInsertDeliveryAddress(deliveryAddressObj, callback);
}

function insertByAccount(account, deliveryAddress, callback) {
    let accountObj = new Account(account);
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);

    // Validate account
    accountObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        // Find account by id
        Account.findById(
            accountObj._id
        ).then((account) => {
            if (!account) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
            deliveryAddressObj.owner = account._id;
            handleInsertDeliveryAddress(deliveryAddressObj, callback);
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
    });
}

function remove(deliveryAddressId, callback) {
    // Delete delivery address by id
    DeliveryAddress.findByIdAndRemove(
        deliveryAddressId
    ).then(() => {
        return callback(null, ResponseUtil.createSuccessResponse(null, 'Delivery address successfully deleted.'));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function handleInsertDeliveryAddress(deliveryAddressObj, callback) {
    // Validate delivery address
    deliveryAddressObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        // Save delivery address
        DeliveryAddress.create(
            deliveryAddressObj
        ).then((deliveryAddress) => {
            if (!deliveryAddress) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
            const data = {'deliveryAddress': deliveryAddress};
            return callback(null, ResponseUtil.createSuccessResponse(data, 'Delivery address successfully created.'));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
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
