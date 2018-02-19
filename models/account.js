'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cryptoUtil = require('../utils/crypt');

let accountSchema = new Schema({
  username: { type: String, required: [true, 'Username is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  firstname: { type: String, required: [true, 'Firstname is required'] },
  lastname: { type: String, required: [true, 'Lastname is required'] },
  email: { type: String, required: [true, 'Email is required'] }
}, {
  timestamps: {}
});

accountSchema.pre('save', function(callback) {
  let account = this;
  if (!account.isModified('password')) return callback();
  account.password = cryptoUtil.hashPwd(account.password);
  return callback();
});

accountSchema.path('password').validate(function(password, callback) {
  let regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/);
  return callback(regex.test(password), 'Password: Require 7 characters, at least 1 letter and one number!');
}, 'An unexpected error occured');

accountSchema.path('email').validate(function(email, callback) {
  let regex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
  return callback(regex.test(email), 'Email: No valid email address');
}, 'An unexpected error occured');

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;