'use strict';

const Account = require('../models/account');
const CreditCard = require('../models/creditCard').CreditCard;
const ResponseUtil = require('../utils/response');

function getByNumber(creditCardNumber, callback) {
    CreditCard.findOne({number: creditCardNumber}, function (error, result) {
        if (error) return callback(ResponseUtil.createNotFoundResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'creditCard': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getAll(callback) {
    CreditCard.find({}, function (error, result) {
        if (error) return callback(ResponseUtil.createNotFoundResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'creditCards': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getByAccountId(accountId, callback) {
    CreditCard.find({'_account': accountId}, function (error, result) {
        if (error) return callback(ResponseUtil.createNotFoundResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'creditCards': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function update(creditCard, callback) {
    let creditCardObj = new CreditCard(creditCard);
    CreditCard.findByIdAndUpdate(creditCardObj._id, creditCardObj, {
        new: true,
        runValidators: true,
        context: 'query'
    }, function (error, result) {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('Credit card failed to update.'));
        result = {'creditCard': result};
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Credit card successfully updated.'));
    });
}

function insert(creditCard, callback) {
    console.log(creditCard);
    let creditCardObj = new CreditCard(creditCard);

    creditCardObj.validate(function (error) {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        creditCardObj.save(function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Credit card failed to create'));
            result = {'creditCard': result};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Credit card successfully created.'));
        });
    });
}

function insertByAccount(account, creditCard, callback) {
    let accountObj = new Account(account);
    let creditCardObj = new CreditCard(creditCard);
    Account.findById(accountObj._id, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        creditCardObj.owner = result._id;
        creditCardObj.validate(function (error) {
            if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
            creditCardObj.save(function (error, result) {
                if (error) return callback(ResponseUtil.createNotFoundResponse(error));
                if (!result) return callback(ResponseUtil.createNotFoundResponse());
                result = {'creditCard': result};
                return callback(null, ResponseUtil.createSuccessResponse(result));
            });
        });
    });
}

function remove(creditCardId, callback) {
    CreditCard.findByIdAndRemove(creditCardId, function (error) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        return callback(null, ResponseUtil.createSuccessResponse(null, 'Creditcard successfully deleted.'));
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
