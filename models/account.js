'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;
const cryptoUtil = require('../utils/crypt');
const Profile = require('../models/profile').Profile;
const ProfileSchema = require('../models/profile').ProfileSchema;

let emailValidator = [
    validate({
        validator: 'matches',
        arguments: ['(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'],
        message: 'Email: {VALUE} is not a valid!'
    })
];

let passwordValidator = [
    validate({
        validator: 'matches',
        arguments: ['^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'],
        message: 'Password: Require 8 characters, at least one letter and one number!'
    })
];

let accountSchema = new Schema({
    username: {type: String, required: [true, 'Username is required'], unique: true},
    password: {type: String, required: [true, 'Password is required'], validate: passwordValidator},
    firstname: {type: String, required: [true, 'Firstname is required']},
    lastname: {type: String, required: [true, 'Lastname is required']},
    email: {type: String, required: [true, 'Email is required'], validate: emailValidator, unique: true},
    isRetailer: { type: Boolean, required: true, default: false },
    profile: {type: ProfileSchema, required: false}
}, {
    timestamps: {}
});

accountSchema.plugin(uniqueValidator, { message: '{PATH}: already exists!' });

accountSchema.pre('save', function (callback) {
    let account = this;
    if (!account.isModified('password')) return callback();
    account.password = cryptoUtil.hashPwd(account.password);
    return callback();
});

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;
