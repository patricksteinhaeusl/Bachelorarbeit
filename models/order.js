'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('../models/item').itemSchema;
const paymentSchema = require('../models/payment').paymentSchema;

let orderSchema = new Schema({
    items: {type: [itemSchema], required: [true, 'Items is required']},
    _deliveryAddress: {type: Schema.Types.ObjectId, ref: 'DeliveryAddress', required: [true, 'Delivery address is required']},
    payment: {type: paymentSchema, required: [true, 'Payment is required']},
    status: {type: String, required: [true, 'Status is required']},
    totalPrice: {type: Number, required: [true, 'Total price is required']},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: true}
}, {
    timestamps: {}
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;
