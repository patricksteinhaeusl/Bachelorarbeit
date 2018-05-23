'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = require('../models/category').categorySchema;
const ratingSchema = require('../models/rating').ratingSchema;
const questionSchema = require('../models/question').questionSchema;

let productSchema = new Schema({
    name: {type: String, required: [true, 'Name is required']},
    category: {type: categorySchema, required: [true, 'Category is required']},
    size: {type: Number, required: [true, 'Size is required']},
    price: {type: Number, required: [true, 'Price is required']},
    image: {type: String, required: [true, 'Image is required']},
    questions: [questionSchema],
    ratings: [ratingSchema],
    rating: {
        value: {type: Number, default: 0, required: [true, 'Rating value is required']}
    }
}, {
    timestamps: {}
});

let Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productSchema
};
