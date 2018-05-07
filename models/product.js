'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = require('../models/category').categorySchema;
const ratingSchema = require('../models/rating').ratingSchema;
const questionSchema = require('../models/question').questionSchema;

let productSchema = new Schema({
    name: {type: String, required: true},
    category: categorySchema,
    size: {type: Number, require: true},
    price: {type: Number, require: true},
    image: {type: String, require: true},
    questions: [questionSchema],
    ratings: [ratingSchema],
    rating: {
        value: {type: Number, default: 0, require: true}
    }
}, {
    timestamps: {}
});

let Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productSchema
};
