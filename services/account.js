'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function getAll(callback) {
    Account.find({isRetailer: false},{
        password: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
        isRetailer: false,
        email: false
    }).then((accounts) => {
            if (!accounts.length) return callback(ResponseUtil.createNotFoundResponse('No accounts found.'));
            let data = {'accounts': accounts};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        })
        .catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function get(accountId, callback) {
    // Find account by id
    Account.findById(
            accountId
        ).then((account) => {
            if (!account) return callback(ResponseUtil.createNotFoundResponse('Account not found.'));
            const data = {'user': account};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function update(account, callback) {
    // Remove fields
    delete account.username;

    let accountObj = new Account(account);

    // Find account by id and update
    // Without password and timestamps
    Account.findByIdAndUpdate(
        accountObj._id,
        accountObj, {
            new: true,
            context: 'query',
            runValidators: true,
            projection: {
                password: false,
                createdAt: false,
                updatedAt: false,
                __v: false
            }
        }).then((account) => {
            if (!account) return callback(ResponseUtil.createNotFoundResponse('Account failed to update.'));
            // Create Token
            CryptoUtil.createToken(account.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
                if (error) callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                const data = {'user': account, 'token': token};
                return callback(null, ResponseUtil.createSuccessResponse(data, 'Account successfully updated.'));
            });
    }).catch((error) => {
        if (error && error.errors) return callback(ResponseUtil.createValidationResponse(error.errors));
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
    getAll,
    update,
    upload
};
