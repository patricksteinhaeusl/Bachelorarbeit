'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let chatUserSchema = new Schema({
    socketId: {type: String, required: [true, 'Socket id is required'], unique: true},
    userId: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'Socket id is required'], unique: true},
    username: {type: String, required: [true, 'Username is required'], unique: true}
}, {
    timestamps: {},
    _id: false
});

chatUserSchema.plugin(uniqueValidator, { message: '{PATH}: already exists!' });

let ChatUserSchema = mongoose.model('ChatUser', chatUserSchema);

module.exports = ChatUserSchema;
