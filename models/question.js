'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    text: {type: String, required: true},
    _account: {type: Schema.Types.ObjectId, ref: 'Account'}
}, {
    timestamps: {}
});

let Question = mongoose.model('Question', questionSchema);

module.exports = {
    Question,
    questionSchema
};
