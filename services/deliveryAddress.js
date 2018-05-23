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
        return callback(null, ResponseUtil.createSuccessResponse(data, 'Delivery address found.'));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function getByAccountId(accountId, callback) {
    // Find delivery addresses by accountId
    DeliveryAddress.find({
        _account: accountId
    }).then((deliveryAddresses) => {
        if (!deliveryAddresses) return callback(ResponseUtil.createNotFoundResponse('No delivery address found.'));
        const data = {'deliveryAddresses': deliveryAddresses};
        return callback(null, ResponseUtil.createSuccessResponse(data));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function update(deliveryAddress, callback) {
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);

    // Validate delivery address
    const validationError = deliveryAddressObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Find and Update delivery address by id
    DeliveryAddress.findByIdAndUpdate(deliveryAddressObj._id, deliveryAddressObj, {
        new: true,
        runValidators: true,
        context: 'query'
    }).then((deliveryAddress) => {
        if (!deliveryAddress) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to update.'));
        const data = {'deliveryAddress': deliveryAddress};
        return callback(null, ResponseUtil.createSuccessResponse(data, 'Delivery address successfully updated.'));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function insert(deliveryAddress, callback) {
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);

    // Validate delivery address
    const validationError = deliveryAddressObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

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
}

function insertByAccount(account, deliveryAddress, callback) {
    let accountObj = new Account(account);
    let deliveryAddressObj = new DeliveryAddress(deliveryAddress);

    // Validate account
    const validationErrorAccount = accountObj.validateSync();
    if (validationErrorAccount) return callback(ResponseUtil.createValidationResponse(validationErrorAccount));

    // Validate delivery address
    const validationErrorDeliveryAddress = deliveryAddressObj.validateSync();
    if (validationErrorDeliveryAddress) return callback(ResponseUtil.createValidationResponse(validationErrorDeliveryAddress));

    // Find account by id
    Account.findById(
        accountObj._id
    ).then((account) => {
        if (!account) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
        deliveryAddressObj.owner = account._id;

        // Save delivery address
        DeliveryAddress.create(
            deliveryAddressObj
        ).then((deliveryAddress) => {
            // Save delivery address
            if (!deliveryAddress) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
            const data = {'deliveryAddress': deliveryAddress};
            return callback(null, ResponseUtil.createSuccessResponse(data, 'Delivery address successfully created.'));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
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

module.exports = {
    get,
    getByAccountId,
    update,
    insert,
    insertByAccount,
    remove
};
