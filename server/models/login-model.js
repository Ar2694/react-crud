// const fields linked over
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');
// login input fields below

const loginSchema = new Schema ({
    username: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
}, { collection: 'login' });

module.exports = mongoose.model('Login', loginSchema);
