// // CK: Not using this. I cri every tiem

// // CK: I'm calling this file "clones" because it deals with duplicates, or "clones", that are created when the user saves a resource to their list of likes.

// const Resource = require('../models/resource');
// const User = require('../models/user');

// module.exports = function (app) {

//     // HTTP Verb: CREATE!
//     // This route saves resource to personal list
//     app.post('/lists/:listId/saved', function (req, res) {
//         if (req.user) {
//             if (req.resource & req.list) {
//                 // CK: Shooting in the dark here. Trying to set the clone's properties to match the parent resource's properties
//                 const clone = new Resource(req.body); // CK: saying the clone is a Resource object
//                 clone.resource = req.resource.resource;
//                 clone.link = req.resource.link;
//                 clone.user = req.resource.user;
//                 clone.mood = req.resource.mood;
//                 List.findById(req.params.listId) // CK: Find the list!
//                     .then(function ([clone, list]) {
//                         Promise.all([
//                             list.resources.unshift(clone._id), // CK: Now add the clone to the resources array of the List object
//                             list.save(), // CK: And save it
//                         ])
//                     }).then(function () {
//                         res.redirect(`/lists/${req.params.listId}`); // CK: Now redirect to the list
//                     }).catch(console.error);
//                 return list.save();
//             } else {
//                 return res.send('Ha no list u dummy'); // no list....
//             }
//         } else {
//             return res.status(401); // unauthorized
//         }
//     });

// }

// // // CK: orig form to make new clone
// // // CK: killed in favor of just pressing a button to save (thus no need for CREATE)
// // app.get('/lists/:listId/faves/new', function (req, res) {
// //     const clone = new Resource(req.body);
// //     List.findById(req.params.listId)
// //         .then(function (saveIt {
// //             return clone = saveIt;
// //         }).then(function (list) {

// //         }))
// // });