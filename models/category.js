'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {type: String, required: [true, 'Name is required']}
}, {
    timestamps: {}
});

let Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category,
    categorySchema
};
