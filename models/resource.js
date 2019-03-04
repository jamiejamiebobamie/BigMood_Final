const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    resource: {
        type: String,
        required: true
    }, // CK: At some point, we should rename this to "title"
    link: {
        type: String,
        required: false
    }, // JM: outdated version(pre-user version). CK: not required b/c some resources, like action items, won't have a link
    user: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    flagged: {
        type: Boolean,
        required: false
    },
    ignoreFlag: {
        type: Boolean,
        required: false
    },
    mood: {
        type: String,
        required: true
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: false
    } // CK: Copied/saved resources (i.e. Clones) on a List should be associated with that List. Not every Resource is going to be a deep copy, so not every Resource needs listId. That's why object listId is set to "required: false".

});

module.exports = mongoose.model('Resource', ResourceSchema);