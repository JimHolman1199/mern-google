const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName : String,
    googleId : String,
    photoUrl : String,
    userEmail: String,
    refreshToken: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
