'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let creditCardSchema = new Schema({
  number: { type: Number, required: [true, 'Number is required'] },
  type: { type: String, required: [true, 'Type is required'], unique: true },
  _account: { type: Schema.Types.ObjectId, ref: 'Account'}
}, {
  timestamps: {}
});

creditCardSchema.path('number').validate(function(number, callback) {
  let regex = new RegExp('(^4[0-9]{12}(?:[0-9]{3})?$|^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)');
  return callback(regex.test(number), 'Number: No valid Mastercard or Visa number!');
}, 'An unexpected error occured');

creditCardSchema.path('type').validate(function(number, callback) {
  let regex = new RegExp('Mastercard|Visa');
  return callback(regex.test(number), 'Type: No valid type selected!');
}, 'An unexpected error occured');

let CreditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = {
  CreditCard,
  creditCardSchema
};