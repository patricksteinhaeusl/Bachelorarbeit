'use strict';

const GlobalConfig = require('../configs/index');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let util = {
    hashPwd: function (password) {
        return crypto
            .createHmac(GlobalConfig.crypt.hash, GlobalConfig.crypt.secret)
            .update(password)
            .digest('hex');
    },
    createToken: function (user, secret, options, next) {
        jwt.sign(user, secret, options, (err, token) => next(err, token));
    }
};

module.exports = util;
