'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('../models/item').itemSchema;
const paymentSchema = require('../models/payment').paymentSchema;

let orderTempSchema = new Schema({
    items: {type: [itemSchema], required: [true, 'Items is required']},
    _deliveryAddress: {type: Schema.Types.ObjectId, ref: 'DeliveryAddress'},
    payment: {type: paymentSchema},
    status: {type: String, default: 'processing', required: [true, 'Status is required']},
    totalPrice: {type: Number, required: [true, 'Total price is required']},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'Account is required']}
}, {
    timestamps: {}
});

let OrderTemp = mongoose.model('OrderTemp', orderTempSchema);

module.exports = OrderTemp;
