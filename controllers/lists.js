const List = require('../models/list');
const Resource = require('../models/resource');
const User = require('../models/user');
// var admin = require('../app');

// CK: "List: Resources :: redditPost: redditComment"

module.exports = function (app) {

  // SHOW a single list
  // CK: Current aim: User can add favorite items to an existing, fixed (provided) list. **A good goal for the future** is to allow users to create and delete lists, too.
  app.get('/lists/:id', function (req, res) {
    // CK: A BUTTON will lead here.
    // var currentUser = req.user;
    List.findById(req.params.id).then(function (list) { // CK: Find the list whose :id is in the path
      Resource.find().then(function (resources) { // CK: Yay, now find its attached resource(s)
        res.render('lists-show', {
          list: list,
          resources: resources,
          currentUser
        }) // CK: Fill in template with the "list" and "resources" that we found and passed in above
      });
    });
  });

  // EDIT form
  app.get('/lists/:id/edit', function (req, res) {
    List.findById(req.params.id, function (err, list) {
      res.render('lists-edit', {
        list: list
      });
    });
  });

  // UPDATE and save the changes
  app.put('/lists/:id', function (req, res) {
    List.findByIdAndUpdate(req.params.id, req.body)
      .then(function (list) {
        console.log(list)
        res.redirect(`/lists/${list._id}`)
      }).catch(function (err) {
        console.log(err.message)
      });
  });

  // "CLONE"/"DEEP COPY"
  // var listItem = jQuery.extend(true, {}, oldObject);

};