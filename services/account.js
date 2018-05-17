'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function get(accountId, callback) {
    Account.findById(accountId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error), 'Something went wrong.');
        if (!result) return callback(ResponseUtil.createNotFoundResponse(), 'Account not found.');
        result = {'user': result};
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Account found.'));
    });
}

function update(account, callback) {
    let accountObj = new Account(account);
    Account.findByIdAndUpdate(accountObj._id, accountObj, {
        new: true,
        runValidators: true,
        context: 'query',
        projection: { password: false, createdAt: false, updatedAt: false, __v: false }
    }, function (error, resAccount) {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors, 'Something went wrong.'));
        if (!resAccount) return callback(ResponseUtil.createNotFoundResponse('Account failed to create'));
        CryptoUtil.createToken(resAccount.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            let result = {'user': resAccount, 'token': token};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Account successfully created.'));
        });
    });
}

function upload(accountId, profile, callback) {
    Account.findOne({_id: accountId}, function(error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('Account not found.'));
        result.profile = profile;
        result.save(function (error, user) {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Account not found.'));
            result = {'user': user};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Profile successfully uploaded.'));
        });
    });
}

module.exports = {
    get,
    update,
    upload
};
