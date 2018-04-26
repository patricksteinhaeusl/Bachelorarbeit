'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let profileSchema = new Schema({
    hobby: {type: String, required: [true, 'Hobby is required']},
    food: {type: String, required: [true, 'Food is required']},
    animal: {type: String, required: [true, 'Animal is required']}
}, {
    timestamps: {}
});

let Profile = mongoose.model('Profile', profileSchema);

module.exports = {
    Profile: Profile,
    ProfileSchema: profileSchema
};
