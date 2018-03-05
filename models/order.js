'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('../models/item').itemSchema;
const deliveryAddressSchema = require('../models/deliveryAddress').deliveryAddressSchema;
const creditCardNotUniqueSchema = require('../models/creditCardNotUnique').creditCardNotUniqueSchema;

let orderSchema = new Schema({
    items: [itemSchema],
    deliveryAddress: deliveryAddressSchema,
    payment: {
        type: {type: String, required: true},
        creditCard: creditCardNotUniqueSchema,
    },
    status: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    _account: {type: Schema.Types.ObjectId, ref: 'Account'}
}, {
    timestamps: {}
});

let Order = mongoose.model('Order', orderSchema);

orderSchema.pre('save', function (callback) {
    let order = this;
    if (!order.isModified('bill')) return callback();
    order.bill = false;
    return callback();
});

module.exports = Order;
