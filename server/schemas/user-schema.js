//importing mongoose to interact with the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user role schema that creates the structure of the document
let userRoleSchema = new Schema({
  role: {
    type: String,
    default: 'standard'}
});

//map schema to model and export it
module.exports = userRoleSchema;
