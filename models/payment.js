'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let paymentSchema = new Schema({
    type: {type: String, required: [true, 'Type is required']},
    _creditCard: {type: Schema.Types.ObjectId, ref: 'CreditCard', required: [true, 'Credit card is required']},
});

let Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
    paymentSchema: paymentSchema,
    Payment: Payment
};
