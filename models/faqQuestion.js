'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let faqSchema = new Schema({
    question: {type: String, required: [true, 'Question is required']},
    answer: {type: String, required: [true, 'Answer is required']},
}, {
    timestamps: {}
});

let Faq = mongoose.model('Faq', faqSchema);

module.exports = {
    Faq,
    faqSchema
};
