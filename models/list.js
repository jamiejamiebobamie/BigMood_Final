const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    resource: String, //used to be "compliment"
    author: String, //outdated version(pre-user version)
    user: String,
    time: String,
    upvotes: Number, //NOT IMPLEMENTED
    flagged: Boolean,
    ignoreFlag: Boolean,
    hashtag: [String]
});

module.exports = mongoose.model('List', ListSchema);
