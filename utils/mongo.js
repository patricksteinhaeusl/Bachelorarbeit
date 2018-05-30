'use strict';

const LogUtil = require('../utils/log');
const GlobalConfig = require('../configs/index');
const mongoose = require('mongoose');
const CreditCard = require('../models/creditCard').CreditCard;

mongoose.Promise = global.Promise;
mongoose.connect(GlobalConfig.mongo.connectionString(), (error) => {
    if(error) {
        LogUtil.writeError(error);
        process.exit(0);
    }
    LogUtil.writeInfo('Databse connection successfully!');
});

let util = mongoose.connection;

util.on('disconnecting', () => {
    LogUtil.writeError('Database disconnecting...');
});

util.on('disconnected', () => {
    LogUtil.writeError('Database disconnected!');
});

util.on('connected', () => {
    addCreditCardYear();
    LogUtil.writeInfo('Database connected!');
});

util.on('connecting', () => {
    LogUtil.writeInfo('Database connecting...');
});

function addCreditCardYear() {

    const minYear = new Date().getFullYear();

    CreditCard.find({}).then((docs) => {
        docs.forEach((doc) => {
            doc.year = minYear + Math.floor(Math.random() * 3);
            doc.save();
        });
    }).catch((error) => {
        LogUtil.writeError(error);
    });
}
module.exports = util;
