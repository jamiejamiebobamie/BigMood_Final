// CK: Yo me. Add a login route

const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
const List = require('../models/list');
const Resource = require('../models/resource');
const User = require('../models/user');
var admin = require('../app');

// function signupViaAjax() {
//    fetch("/sign-up")
//      .then(function(data) {
//        // Here you get the data to modify as you please
//      })
//      .catch(function(error) {
//        // If there is any error you will catch them here
//      });
//  }

module.exports = function(app) {
// NEW sign-up form
app.get('/sign-up', function(req, res) {
  res.render('sign-up', {});
});


// CREATE user
app.post('/sign-up', function(req, res) {

    const newUser = new User(req.body);

    const token = jwt.sign({ _id: user._id }, 'shhhhhhared-secret');

    newUser.save(function(err) {
        if (err) console.log(err);
        const token = jwt.sign({ _id: user._id }, 'shhhhhhared-secret');
        // saved!
        console.log(token)
    });

    console.log(req.body);
    console.log(token)

    res.redirect(`/`);
  // }).catch((err) => {
  //   console.log(err.message);
  //   });
    });
}
