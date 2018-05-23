'use strict';

const mongoose = require('mongoose');

let messageSchema = new Schema({
    from: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'From is required']},
    to: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'To is required']},
    text: {type: String, required: [true, 'Text is required']},
}, {
    timestamps: {}
});

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
