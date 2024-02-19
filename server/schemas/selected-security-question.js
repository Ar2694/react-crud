const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates the values to fill out

let selectedSecurityQuestionSchema = new Schema ({
  questionText: { type: String },
  answerText: { type: String }
})

module.exports = selectedSecurityQuestionSchema;
