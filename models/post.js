'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    text: {type: String, required: [true, 'Text is required']},
    image: {type: String, required: [true, 'Image is required']},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'Account is required']}
}, {
    timestamps: {}
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;
