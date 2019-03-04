// CK: I'm calling this file "clones" because it deals with duplicates, or "clones", that are created when the user saves a resource to their list of likes.

// CK: To-Do: Reference TDD-BDD-testing where I hard-coded the cart for testing. Since we're hard-coding a list for them to use, I think we must hard-code the list here.

// CK: To-Do: Only a user should be able to do this. Add that in later.

const Resource = require('../models/resource');
const List = require('../models/list');
const clone = new Resource(req.body); // CK: saying the clone is a Resource object


module.exports = function (app) {

    // HTTP Verb: CREATE!
    // This route saves resource to personal list
    app.post('/lists/:listId/saved', function (req, res) {
        let resource;
        let list;
        // CK: Shooting in the dark here. Trying to set the clone's properties to match the parent resource's properties
        clone.resource = resource.resource;
        clone.link = resource.link;
        clone.user = resource.user;
        clone.mood = resource.mood;
        List.findById(req.params.listId) // CK: Find the list!
            .then(function ([clone, list]) {
                Promise.all([
                    list.resources.unshift(clone._id), // CK: Now add the clone to the resources array of the List object
                    list.save(), // CK: And save it
                ])
            }).then(function () {
                res.redirect(`/lists/${req.params.listId}`); // CK: Now redirect to the list
            }).catch(console.error);
        return list.save();
    });

}

// // CK: orig form to make new clone
// // CK: killed in favor of just pressing a button to save (thus no need for CREATE)
// app.get('/lists/:listId/faves/new', function (req, res) {
//     const clone = new Resource(req.body);
//     List.findById(req.params.listId)
//         .then(function (saveIt {
//             return clone = saveIt;
//         }).then(function (list) {

//         }))
// });