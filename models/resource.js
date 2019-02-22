const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    resource: String,
    link: String, //outdated version(pre-user version)
    user: String,
    time: String,
    flagged: Boolean,
    ignoreFlag: Boolean,
    mood: Array
});

module.exports = mongoose.model('Resource', ResourceSchema);
