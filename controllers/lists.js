const List = require('../models/list');
const Resource = require('../models/resource');
const User = require('../models/user');
// var admin = require('../app');

// CK: "List: Resources :: redditPost: redditComment"

module.exports = function(app) {

  // SHOW a single list
  // CK: For now, we will have only SHOW, not INDEX. Current aim: User can add favorite items to an existing, fixed (provided) list. **A good goal for the future** is to allow users to create and delete lists, too; however, simplifying for now will allow us to reach full essential functionality more efficiently.
  app.get('/lists/:id', function(req, res) {
    // CK: A BUTTON will lead here.
    // CK: Add the following commented-out lines once auth is set up UNLESS IT PROVES UNNECESSARY
    // CK: (contd.) i.e. the app.use() jwt stuff proves to be enough
    // var currentUser = req.user;
    // console.log(req.cookies);
    List.findById(req.params.id).then(function(list) { // CK: Find the list whose :id is in the path
      Resource.find().then(function(resources) { // CK: Yay, now find its attached resource(s)
        res.render('lists-show', {list: list, resources: resoures}) // CK: Fill in template with the "list" and "resources" that we found and passed in above
      });
    });
  });

  // EDIT form
  app.get('/lists/:id/edit', function(req, res) {
    List.findById(req.params.id, function(err, list) {
      res.render('lists-edit', {list: list});
    });
  });

  // UPDATE and save the changes
  app.put('/lists/:id', function(req, res) {
    List.findByIdAndUpdate(req.params.id, req.body)
    .then(function(list) {
      console.log(list)
      res.redirect(`/lists/${list._id}`)
    }).catch(function(err) {
      console.log(err.message)
    });
  });

  // "CLONE"/"DEEP COPY"
  // var listItem = jQuery.extend(true, {}, oldObject);

};