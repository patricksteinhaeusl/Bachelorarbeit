'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = require('../models/category').categorySchema;
const ratingSchema = require('../models/rating').ratingSchema;

let productSchema = new Schema({
  name: { type: String, required: true },
  category: categorySchema,
  size: { type: Number, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  ratings: [ratingSchema],
  rating: {}
}, {
  timestamps: {}
});

let Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
  productSchema
};