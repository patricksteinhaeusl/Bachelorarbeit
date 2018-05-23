'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('../models/product').productSchema;

let itemSchema = new Schema({
    quantity: {type: Number, required: true},
    product: {type: productSchema, required: true}
}, {
    timestamps: {}
});

let Item = mongoose.model('Item', itemSchema);

module.exports = {
    Item,
    itemSchema
};
