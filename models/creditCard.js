'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;

let numberValidator = [
    validate({
        validator: 'matches',
        arguments: ['(^4[0-9]{12}(?:[0-9]{3})?$|^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)'],
        message: 'number: {VALUE} is no valid Mastercard or Visa number!'
    })
];

let typeValidator = [
    validate({
        validator: 'matches',
        arguments: ['Mastercard|Visa'],
        message: 'type: {VALUE} is no valid Mastercard or Visa number!'
    })
];

let creditCardSchema = new Schema({
    number: {type: String, required: [true, 'Number is required'], validate: numberValidator, unique: true},
    type: {type: String, required: [true, 'Type is required'], validate: typeValidator},
    _account: {type: Schema.Types.ObjectId, ref: 'Account'}
}, {
    timestamps: {}
});

creditCardSchema.plugin(uniqueValidator, { message: '{PATH}: already exists!' });

let CreditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = {
    CreditCard,
    creditCardSchema
};
