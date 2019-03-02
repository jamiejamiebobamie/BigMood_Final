const List = require('../models/list'); // may need if we're sticking the deep copy route here
const Resource = require('../models/resource');
const User = require('../models/user');
// var admin = require('../app');

// CK: "List: Resources :: redditPost: redditComment"

module.exports = function(app) {

    //ROOT ROUTE
    //https://stackoverflow.com/questions/39277670/how-to-find-random-record-in-mongoose
    app.get('/', function(req, res) {
      var currentUser = req.user;
      Resource.count().exec(function (err, count) {
        // "Get a random entry"
        var random = Math.floor(Math.random() * count)
        // "Again query all users but only fetch one offset by our random #""
        Resource.findOne().skip(random).exec(
          function (err, result) {
           // "Tada! random user"
            console.log(result)
            res.render('landing', { resource: result, currentUser});
        });
      });
    });

    // NEW resource form
    app.get('/resources/new', function(req, res) {
      res.render('resources-new', {});
    });

    app.get('/moods/:mood', function(req, res) {
        Resource.find({moods: {$all:
        [req.params.tag]}}).then(function(resources) {
            console.log(resources)
            res.render('mood-resource-index', {
                resources:resources, mood:
                req.params.mood});
            }).catch(err => console.log(err));
        })


    // CREATE NEW resource
    app.post('/resources', function(req, res) {
      Resource.create(req.body).then(function(resource) {
        parsedMood = req.body.moodString.split(", "); // CK: turns user's mood input from a string to an array
        resource.mood = parsedMood; // CK: reassigns meaning for parsedMood
        console.log(resource);
        resource.save();
        res.redirect(`/`);
      }).catch(function(err) {
        console.log(err.message);
      });
    });

    // // Index/Read for a SPECIFIC mood
    // app.get('/moods/:mood', (req, res) => {
    //   Resource.find({moods: {$all:[req.params.mood]}}).then(resources => {
    //     console.log(resources)
    //     res.render('by-mood', {resources: resources, mood: req.params.mood});
    //   }).catch(err => {
    //     console.log(err.message);
    //   });
    // });

    // CK: note to self - address this later
    // CK: note to self - have the buttons on landing page direct to here
    // CK: note to self - will need to have some other things direct to here, too (ex. "show me another" button on a single shown recommendation)
    // // SHOW a SINGLE resource for a SPECIFIC mood
    // app.get('/:mood', (req, res) => {
    //   // find resource
    //   Resource.findById(req.params.id).then(resource => {
    //       res.render('resources-show-admin', { resource: resource})})
    //       .catch((err) => {
    //     console.log(err.message)
    //   });
    // });







// ---------- ADMIN FEATURES BELOW ------------


  // SHOW A single resource for ADMIN USE ONLY
  app.get('/resources/:id', function(req, res) {
    // find resource
    Resource.findById(req.params.id).then(function(resource) {
        res.render('resources-show-admin', { resource: resource})})
        .catch(function(err) {
      console.log(err.message)
    });
  });

      //admin see all to edit
      app.get('/index', function(req, res) {
          Resource.find()
             .then(function(resources) {
               res.render('resources-index', { resources: resources });
             })
             .catch(function(err) {
               console.log(err);
             })
      });

    // EDIT a resource by clicking on the edit link in the shown resource
    // CK: EDIT yields the FORM to make changes to an existing item
    app.get('/resources/:id/edit', function(req, res) {
      Resource.findById(req.params.id, function(err, resource) {
        res.render('resources-edit', {resource: resource});
      })
    });


    // UPDATE... does this replace EDIT? ...guess not...
    // CK: UPDATE represents the actual process of ENACTING the changes made by user in the form that they received from EDIT. It's the same way CREATE actually ... well ... CREATES the thing that the user wrote the contents of in the form they received from NEW.
    app.put('/resources/:id', function(req, res) {
      Resource.findByIdAndUpdate(req.params.id, req.body).then(function(resource) {
          res.redirect('/index');
        })
        .catch(function(err) {
          console.log(err.message)
        })
    });


    // DELETE one resource from the delete button on the "shown" resource page
    app.delete(`/resources/:id`, function (req, res) {
      console.log("DELETE resource")
      Resource.findByIdAndRemove(req.params.id).then(function(resource) {
         res.redirect('/index');
      }).catch(function(err) {
        console.log(err.message);
      })
    });

};
