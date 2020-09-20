const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    Email: { type: String, required: true, unique: true,trim: true, minlength: 3 },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, 
    {timestamps: true }
);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;