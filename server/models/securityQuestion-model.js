const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let securityQuestionSchema = new Schema({
    text: {type: String},
    isDisabled: {type: Boolean, default: false}
}, {collection: "securityQuestions"});

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
