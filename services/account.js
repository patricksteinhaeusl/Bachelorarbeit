'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function get(accountId, callback) {
    // Find account by id
    Account.findById(
            accountId
        ).then((account) => {
            if (!account) return callback(ResponseUtil.createNotFoundResponse(), 'Account not found.');
            const data = {'user': account};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function update(account, callback) {
    let accountObj = new Account(account);

    // Validate account
    const validationError = accountObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Find account by id and update
    // Without password and timestamps
    Account.findByIdAndUpdate(
        accountObj._id,
        accountObj, {
            new: true,
            context: 'query',
            projection: {
                password: false,
                createdAt: false,
                updatedAt: false,
                __v: false
            }
        }).then((account) => {
            if (!account) return callback(ResponseUtil.createNotFoundResponse('Account failed to create'));
            // Create Token
            CryptoUtil.createToken(account.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
                if (error) callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                const data = {'user': account, 'token': token};
                return callback(null, ResponseUtil.createSuccessResponse(data, 'Account successfully created.'));
            });
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function upload(accountId, profile, callback) {
    // Find account by id
    Account.findOne({
            _id: accountId
        }).then((account) => {
            if (!account) return callback(ResponseUtil.createNotFoundResponse('Account not found.'));
            // Add profile to account
            account.profile = profile;
            return account;
        }).then((accountObj) => {
            // Save account
            Account.create(accountObj).then((updatedAccount) => {
                if (!updatedAccount) return callback(ResponseUtil.createNotFoundResponse('Account not found.'));
                const data = {'user': updatedAccount};
                return callback(null, ResponseUtil.createSuccessResponse(data, 'Profile successfully uploaded.'));
            }).catch((error) => {
                return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            });
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

module.exports = {
    get,
    update,
    upload
};
