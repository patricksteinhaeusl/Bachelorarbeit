'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let accountWithoutIdSchema = new Schema({
    firstname: {type: String, required: [true, 'Firstname is required']},
    lastname: {type: String, required: [true, 'Lastname is required']},
    isRetailer: { type: Boolean, default: false, required: [true, 'Retailer is required'] }
}, {
    _id: false,
    timestamps: {}
});

let AccountWithoutId = mongoose.model('AccountWithoutId', accountWithoutIdSchema);

module.exports = AccountWithoutId;
