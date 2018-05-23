'use strict';

const Account = require('../models/account');
const CreditCard = require('../models/creditCard').CreditCard;
const ResponseUtil = require('../utils/response');

function getByNumber(creditCardNumber, callback) {
    // Find one credit card by number
    CreditCard.findOne({
        number: creditCardNumber
    }).then((creditCard) => {
        if (!creditCard) return callback(ResponseUtil.createNotFoundResponse('No credit card found.'));
        const data = {'creditCard': creditCard};
        return callback(null, ResponseUtil.createSuccessResponse(data));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function getAll(callback) {
    // Find all credit cards
    CreditCard.find({
        }).then((creditCards) => {
            if (!creditCards) return callback(ResponseUtil.createNotFoundResponse('No credit cards found.'));
            const data = {'creditCards': creditCards};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getByAccountId(accountId, callback) {
    // Find all credit cards by account id
    CreditCard.find({
            '_account': accountId
        }).then((creditCards) => {
            if (!creditCards) return callback(ResponseUtil.createNotFoundResponse('No credit cards found.'));
            const data = {'creditCards': creditCards};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function update(creditCard, callback) {
    // Update credit card by id
    let creditCardObj = new CreditCard(creditCard);

    // Validate credit card
    const validationError = creditCardObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Find and update credit card by id
    CreditCard.findByIdAndUpdate(creditCardObj._id, creditCardObj, {
        new: true,
        context: 'query'
    }).then((creditCard) => {
        if (!creditCard) return callback(ResponseUtil.createNotFoundResponse('Credit card failed to update.'));
        const data = {'creditCard': creditCard};
        return callback(null, ResponseUtil.createSuccessResponse(data, 'Credit card successfully updated.'));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function insert(creditCard, callback) {
    let creditCardObj = new CreditCard(creditCard);

    // Validate credit card
    const validationError = creditCardObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Save credit card
    CreditCard.create(creditCardObj).then((creditCard) => {
        if (!creditCard) return callback(ResponseUtil.createNotFoundResponse('Credit card failed to create.'));
        const data = {'creditCard': creditCard};
        return callback(null, ResponseUtil.createSuccessResponse(data, 'Credit card successfully created.'));
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function insertByAccount(account, creditCard, callback) {
    let accountObj = new Account(account);
    let creditCardObj = new CreditCard(creditCard);

    // Validate credit card
    const validationError = accountObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Find Account by id
    Account.findById(accountObj._id).then((account) => {
        if (!account) return callback(ResponseUtil.createNotFoundResponse('Credit card failed to create.'));

        creditCardObj.owner = account._id;

        // Validate credit card
        const validationError = creditCardObj.validateSync();
        if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

        // Save credit card
        CreditCard.create(creditCardObj).then((creditCard) => {
            if (!creditCard) return callback(ResponseUtil.createNotFoundResponse('Credit card failed to create.'));
            const data = {'creditCard': creditCard};
            return callback(null, ResponseUtil.createSuccessResponse(data, 'Credit card successfully created.'));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

function remove(creditCardId, callback) {
    // Delete credit card by id
    CreditCard.findByIdAndRemove(
            creditCardId
        ).then(() => {
            return callback(null, ResponseUtil.createSuccessResponse(null, 'Credit card successfully deleted.'));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

module.exports = {
    getByNumber,
    getAll,
    getByAccountId,
    update,
    insert,
    insertByAccount,
    remove
};
