'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const Profile = require('../models/profile').Profile;
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function get(accountId, callback) {
    Account.findById(accountId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'user': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
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
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        if (!resAccount) return callback(ResponseUtil.createNotFoundResponse('Account failed to create'));
        CryptoUtil.createToken(resAccount.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error));
            let result = {'user': resAccount, 'token': token};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Account successfully created.'));
        });
    });
}

function insertOrUpdateProfile(accountId, profile, callback) {
    let profileObj = new Profile(profile);
    profileObj.validate(function(error) {
        if(error) return callback(ResponseUtil.createValidationResponse(error.errors));
        Account.findOne({_id: accountId}, function (error, result) {
            if (error) {
                if(error.hasOwnProperty("errors")) {
                    return callback(ResponseUtil.createValidationResponse(error.errors));
                }
                return callback(ResponseUtil.createErrorResponse(error));
            }
            result.profile = profileObj;
            result.save(function (error, resAccount) {
                if (error) {
                    if(error.hasOwnProperty("errors")) {
                        return callback(ResponseUtil.createValidationResponse(error.errors));
                    }
                    return callback(ResponseUtil.createErrorResponse(error));
                }
                CryptoUtil.createToken(resAccount.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
                    if (error) return callback(ResponseUtil.createErrorResponse(error));
                    let result = {'user': resAccount, 'token': token};
                    return callback(null, ResponseUtil.createSuccessResponse(result, 'Profile successfully saved.'));
                });
            });
        });
    });
}

function getProfileByAccountId(accountId, callback) {
    Account.findOne({'_id': accountId }, function (error, result) {
        if (error) {
            if (error.hasOwnProperty("errors")) {
                return callback(ResponseUtil.createValidationResponse(error.errors));
            }
            return callback(ResponseUtil.createErrorResponse(error));
        }
        if (!result) return callback(ResponseUtil.createNotFoundResponse('Profile not found.'));
        result = {'profile': result.profile};
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Profile found.'));
    });
}

module.exports = {
    get,
    update,
    insertOrUpdateProfile,
    getProfileByAccountId
};
