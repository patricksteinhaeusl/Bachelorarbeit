'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ratingSchema = new Schema({
  value: { type: Number, required: true },
  comment: { type: String, required: true },
  _account: { type: Schema.Types.ObjectId, ref: 'Account'}
}, {
  timestamps: {}
});

let Rating = mongoose.model('Rating', ratingSchema);

module.exports = {
  Rating,
  ratingSchema
};
