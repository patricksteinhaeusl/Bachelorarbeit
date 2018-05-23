'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let deliveryAddressSchema = new Schema({
    street: {type: String, required: [true, 'Street is required']},
    city: {type: String, required: [true, 'City is required']},
    zip: {type: Number, required: [true, 'Zip is required']},
    country: {type: String, required: [true, 'Country is required']},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'Account is required']}
}, {
    timestamps: {}
});

let DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

module.exports = {
    DeliveryAddress,
    deliveryAddressSchema
};
