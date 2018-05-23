'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ratingSchema = new Schema({
    value: {type: Number, required: [true, 'Value is required']},
    comment: {type: String, required: [true, 'Comment is required']},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'Account is required']}
}, {
    timestamps: {}
});

let Rating = mongoose.model('Rating', ratingSchema);

module.exports = {
    Rating,
    ratingSchema
};
