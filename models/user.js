const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//NOTE TO CHERISH: not implemented for our project or my compliment generator and I have no idea how to

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    hashtag: [String]
});

module.exports = mongoose.model('User', UserSchema);
