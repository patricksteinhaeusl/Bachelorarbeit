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

    // Find one user with username and password
    // Without password and timestamps
    Account.findOne({
            username: usernameObj,
            password: hashedPassword,
            isRetailer: false,
        }, {
            password: false,
            createdAt: false,
            updatedAt: false,
            __v: false
        }).then((account) => {
            if (!account) {
                return callback(null, ResponseUtil.createNotFoundResponse('Username or Password incorrect.'));
            } else {
                // Create Token
                CryptoUtil.createToken(account.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token)=> {
                    if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                    const data = {'user': account, 'token': token};
                    return callback(null, ResponseUtil.createSuccessResponse(data, 'Login successfully.'));
                });
            }
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function register(account, callback) {
    let accountObj = new Account(account);

    // Validate account
    const validationError = accountObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Save account
    Account.create(accountObj).then((account) => {
        if (!account) return callback(ResponseUtil.createNotFoundResponse('Registration failed.'));
        // Find account
        // Without password and timestamps
        Account.findOne(result, {
                password: false,
                createdAt: false,
                updatedAt: false,
                __v: false
            }).then((account) => {
                if (!account) return callback(ResponseUtil.createNotFoundResponse('Registration failed'));

                // Create token
                CryptoUtil.createToken(account.toObject(), GlobalConfig.jwt.secret, GlobalConfig.auth.signOptions, (error, token)=> {
                    if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                    const data = {'user': account, 'token': token};
                    return callback(null, ResponseUtil.createSuccessResponse(data, 'Registration successfully.'));
                });
            }).catch((error) => {
                return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            });
    }).catch((error) => {
        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    });
}

module.exports = {
    login,
    register
};
