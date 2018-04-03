'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;

let numberValidator = [
    validate({
        validator: 'matches',
        arguments: ['(^4[0-9]{12}(?:[0-9]{3})?$|^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)'],
        message: 'Number: {VALUE} is no valid Mastercard or Visa number!'
    })
];

let typeValidator = [
    validate({
        validator: 'matches',
        arguments: ['Mastercard|Visa'],
        message: 'Type: {VALUE} is no valid Mastercard or Visa number!'
    })
];

let cvvValidator = [
    validate({
        validator: 'matches',
        arguments: ['^[0-9]{3,4}$'],
        message: 'CVV: {VALUE} is not valid! Must contain 3 or 4 digits.'
    })
];

let minYear = new Date().getFullYear();
let maxYear = minYear + 3;

let creditCardSchema = new Schema({
    number: {type: String, required: [true, 'Number is required'], validate: numberValidator, unique: true},
    type: {type: String, required: [true, 'Type is required'], validate: typeValidator},
    cvv: {type: String, required: [true, 'CVV is required'], validate: cvvValidator},
    year: {type: Number, required: [true, 'Year is required'], min: [minYear, 'Year: {VALUE} is not valid. Must be between ' + minYear + ' and ' + maxYear], max: [maxYear, 'Year: {VALUE} is not valid. Must be between ' + minYear + ' and ' + maxYear]},
    month: {type: Number, required: [true, 'Month is required'], min: [1, 'Month: {VALUE} is not valid. Must be between 1 and 12'], max: [12, 'Month: {VALUE} is not valid. Must be between 1 and 12']},
    _account: {type: Schema.Types.ObjectId, ref: 'Account'}
}, {
    timestamps: {}
});

creditCardSchema.plugin(uniqueValidator, { message: '{PATH}: already exists!' });

let CreditCard = mongoose.model('CreditCard', creditCardSchema);

CreditCard.find({}, function(error, docs) {
    docs.forEach(function(doc) {
        doc.year = minYear + Math.floor(Math.random() * 3);
        doc.save();
    });
});

module.exports = {
    CreditCard,
    creditCardSchema
};
