const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//NOTE TO CHERISH: some (read most) of these properties are outdated and from my compliment generator

const ResourceSchema = new Schema({
    resource: String, //used to be "compliment"
    author: String, //outdated version(pre-user version)
    user: String,
    time: String,
    upvotes: Number, //NOT IMPLEMENTED
    flagged: Boolean,
    ignoreFlag: Boolean,
    hashtag: [String]
});

module.exports = mongoose.model('Resource', ResourceSchema);
