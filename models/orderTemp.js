'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('../models/item').itemSchema;
const paymentSchema = require('../models/payment').paymentSchema;

let orderTempSchema = new Schema({
    items: {type: [itemSchema]},
    _deliveryAddress: {type: Schema.Types.ObjectId, ref: 'DeliveryAddress'},
    payment: {type: paymentSchema},
    status: {type: String, required: true, default: 'processing'},
    totalPrice: {type: Number, required: true},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: true}
}, {
    timestamps: {}
});

let OrderTemp = mongoose.model('OrderTemp', orderTempSchema);

module.exports = OrderTemp;
