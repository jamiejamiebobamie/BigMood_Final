const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    resource: {type: String, required: true},
    link: {type: String, required: false}, // JM: outdated version(pre-user version). CK: not required b/c some resources, like action items, won't have a link
    user: {type: String, required: false},
    time: {type: String, required: false},
    flagged: {type: Boolean, required: false},
    ignoreFlag: {type: Boolean, required: false},
    // mood: {type: Array, required: true}, // CK: Why an array? Well, we might find a resource that's good for both, say, anger and sadness. Being able to "tag" media for plural moods would be useful.
    mood: {type: String, require: true},
    listId: {type: Schema.Types.ObjectId, ref: 'List', required: false} // CK: Resources deep-copied onto a List should be associated with that List. Not every Resource is going to be a deep copy, so not every Resource needs listId. That's why little object listId is set to "required: false".
});

module.exports = mongoose.model('Resource', ResourceSchema);
