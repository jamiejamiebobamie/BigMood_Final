const List = require('../models/list');
const Resource = require('../models/resource');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// var admin = require('../app');

module.exports = function (app) {

  // NEW sign-up form
  app.get('/sign-up', function (req, res) {
    res.render('sign-up');
  });

  // CREATE user, i.e. user is signed up!
  app.post('/sign-up', function (req, res) {
    const newUser = new User(req.body);
    newUser.save().then((newUser) => {
      var token = jwt.sign({
        _id: newUser._id
      }, process.env.SECRET, {
        expiresIn: "30 days"
      });
      res.cookie('nToken', token, {
        maxAge: 900000,
        httpOnly: true
      });
      res.redirect('/');
    }).catch(function (err) {
      console.log(err.message);
      return res.status(400).send({
        err: err
      });
    });
  });

  // Login form
  app.get('/login', function (req, res) {
    res.render('login');
  });

  // User is logged in!
  app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User(req.body);

    User.findOne({
        username
      }, 'username password')
      .then(function (newUser) {
        if (!newUser) {
          return res.status(401).send({
            message: 'Invalid credentials'
          });
        }
        newUser.comparePassword(password, function (err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({
              message: 'Invalid credentials'
            });
          }
          const token = jwt.sign({
            _id: newUser._id
          }, process.env.SECRET, {
            expiresIn: '30 days'
          });
          res.cookie('nToken', token, {
            maxAge: 900000,
            httpOnly: true
          });
          res.redirect('/');
        });
      }).catch(function (err) {
        console.log(err);
      });
  });

  // Log out
  app.get('/logout', function (req, res) {
    res.clearCookie('nToken');
    res.redirect('/');
  });

};

// // CK: With the approach I'm taking to try to solve this, showing liked resources isn't needed because one of the properties of our List model is "resources".
// // SHOW LIKED RESOURCES
// app.get("/user/:id", function (req, res) {
//   var currentUser = req.user;
//   User.findById(req.params.id).populate('resources').lean()
//     .then(currentUser => {
//       res.render("likedContent", {
//         currentUser
//       });
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });

// // CK: Migrated to ./controllers/clones.js
// // SAVE resource
// app.post('/user/:id/resources/:resourceId', function (req, res) {
//   const currentUser = req.user;
//   const save = req.params.resourceId;
//   // console.log(currentUser, req.user._id, req.params.resourceId);
//   Resource.findById(save)
//     .then((resource) => {
//       // console.log(resource);
//       User.findById(currentUser)
//         .then((user) => {
//           // this works sometimes. it seems to be something with asynchronicity of
//           // node callbacks (?). we need a promise or something
//           console.log("username: " + user.username)
//           user.likedContent.unshift(resource);
//           console.log("added resource: " + user.likedContent[0]);
//           // res.redirect(`/user/${currentUser.id}`)
//           // return Promise.all([
//           //     user.save()
//           // ]);
//           res.redirect(`/user/${req.params.userId}`);
//         })
//     })
//     // .then(user => {
//     //     res.redirect(`/user/${req.params.userId}`);
//     // })
//     .catch(err => {
//       console.log(err);
//     });

// });