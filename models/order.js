'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('../models/item').itemSchema;
const paymentSchema = require('../models/payment').paymentSchema;

let orderSchema = new Schema({
    items: {type: [itemSchema], required: true},
    _deliveryAddress: {type: Schema.Types.ObjectId, ref: 'DeliveryAddress', required: true},
    payment: {type: paymentSchema, required: true},
    status: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: true}
}, {
    timestamps: {}
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;
