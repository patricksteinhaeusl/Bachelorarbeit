'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatMessageSchema = new Schema({
    from: {
        id: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'From id is required']},
        username: {type: String, required: [true, 'From username is required']}
    },
    to: {
        id: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'From id is required']},
        username: {type: String, required: [true, 'From username is required']}
    },
    text: {type: String, required: [true, 'Text is required']},
}, {
    timestamps: {}
});

let ChatMessageSchema = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessageSchema;
