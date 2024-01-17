// const fields linked over
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user input fields below

const userSchema = new Schema ({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    isDisabled: { type: Boolean, default: false },
    isDeletable: {type: Boolean, default: true},
    isEditable: {type: Boolean, default: true},
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
