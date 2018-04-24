'use strict';

const GlobalConfig = require('../configs/index');
const Account = require('../models/account');
const CryptoUtil = require('../utils/crypt');
const ResponseUtil = require('../utils/response');

function login(username, password, callback) {
    if (!(username && password)) {
        return callback(null, ResponseUtil.createNotFoundResponse('Username or Password incorrect'));
    }

    // Injection Code Start - NoSQL Injection, Login bypass
    let hashedPassword = null;
    let usernameObj = null;

    try {
        hashedPassword = JSON.parse(password);
    } catch (exception) {
        hashedPassword = CryptoUtil.hashPwd(password);
    }

    try {
        usernameObj = JSON.parse(username);
    } catch (exception) {
        usernameObj = username;
    }
    // Injection Code End

    Account.findOne({
        username: usernameObj,
        password: hashedPassword,
        isRetailer: false,
    }, { password: false, createdAt: false, updatedAt: false, __v: false }, function (error, resAccount) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!resAccount) {
            return callback(null, ResponseUtil.createNotFoundResponse('Username or Password incorrect'));
        } else {
            CryptoUtil.createToken(resAccount.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
                if (error) return callback(ResponseUtil.createErrorResponse(error));
                let result = {'user': resAccount, 'token': token};
                return callback(null, ResponseUtil.createSuccessResponse(result, 'Login successfully'));
            });
        }
    });
}

function register(account, callback) {
    let accountObj = new Account(account);
    accountObj.validate(function (error) {
        if(error) return callback(ResponseUtil.createValidationResponse(error.errors));
        accountObj.save(function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Registration failed'));
            Account.findOne(result, { password: false, createdAt: false, updatedAt: false, __v: false }, function (error, resAccount) {
                if (error) return callback(ResponseUtil.createErrorResponse(error));
                if (!result) return callback(ResponseUtil.createNotFoundResponse('Registration failed'));
                CryptoUtil.createToken(resAccount.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token) => {
                    if (error) return callback(ResponseUtil.createErrorResponse(error));
                    let result = {'user': resAccount, 'token': token};
                    return callback(null, ResponseUtil.createSuccessResponse(result, 'Registration successfully'));
                });
            });
        });
    });
}

module.exports = {
    login,
    register
};
