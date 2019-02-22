const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    // CK: "List: resources :: reddit_Post: reddit_Comment"
    // CK: AT A LATER TIME!! LATER!! NOT NOW!! We will add author
    title: { type: String, required: true },
    description: { type: String, required: true },
    resources: [{ type: Schema.Types.ObjectId, ref: 'Resource', required: false}]
});

module.exports = mongoose.model('List', ListSchema);
