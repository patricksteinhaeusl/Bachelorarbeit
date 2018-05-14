'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let faqSchema = new Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
}, {
    timestamps: {}
});

let Faq = mongoose.model('Faq', faqSchema);

module.exports = {
    Faq,
    faqSchema
};
