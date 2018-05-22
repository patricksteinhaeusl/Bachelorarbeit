'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let paymentSchema = new Schema({
    type: {type: String, required: true},
    _creditCard: {type: Schema.Types.ObjectId, ref: 'CreditCard'},
});

let Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
    paymentSchema: paymentSchema,
    Payment: Payment
};
