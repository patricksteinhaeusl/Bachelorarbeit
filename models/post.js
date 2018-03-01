'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  _account: { type: Schema.Types.ObjectId, ref: 'Account'}
}, {
  timestamps: {}
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;
