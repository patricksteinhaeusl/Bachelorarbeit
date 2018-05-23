'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    text: {type: String, required: [true, 'Text is required']},
    _account: {type: Schema.Types.ObjectId, ref: 'Account', required: [true, 'Account is required']}
}, {
    timestamps: {}
});

let Question = mongoose.model('Question', questionSchema);

module.exports = {
    Question,
    questionSchema
};
