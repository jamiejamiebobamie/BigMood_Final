const Resource = require('../models/resource');
const User = require('../models/user');

module.exports = function (app) {

  app.get('/angry', function (req, res) {
    var currentUser = req.user;
    console.log('HAHAHAHA: ' + currentUser);
    Resource.count({
      mood: 'Angry'
    }).exec(function (err, count) {
      // "Get a random entry"
      var random = Math.floor(Math.random() * count)
      // "Again query all users but only fetch one offset by our random #""
      Resource.findOne({
        mood: 'Angry'
      }).skip(random).exec(
        function (err, result) {
          // "Tada! random"
          console.log(result)
          res.render('angry', {
            resource: result,
            currentUser
          });
        })
    })
  });

  app.get('/bored', function (req, res) {
    var currentUser = req.user;
    Resource.count({
      mood: 'Bored'
    }).exec(function (err, count) {
      var random = Math.floor(Math.random() * count)
      Resource.findOne({
        mood: 'Bored'
      }).skip(random).exec(
        function (err, result) {
          console.log(result)
          res.render('bored', {
            resource: result,
            currentUser
          });
        })
    })
  });

  app.get('/frustrated', function (req, res) {
    var currentUser = req.user;
    Resource.count({
      mood: 'Frustrated'
    }).exec(function (err, count) {
      var random = Math.floor(Math.random() * count)
      Resource.findOne({
        mood: 'Frustrated'
      }).skip(random).exec(
        function (err, result) {
          console.log(result)
          res.render('frustrated', {
            resource: result,
            currentUser
          });
        })
    })
  });

  app.get('/lonely', function (req, res) {
    var currentUser = req.user;
    Resource.count({
      mood: 'Lonely'
    }).exec(function (err, count) {
      var random = Math.floor(Math.random() * count)
      Resource.findOne({
        mood: 'Lonely'
      }).skip(random).exec(
        function (err, result) {
          console.log(result)
          res.render('lonely', {
            resource: result,
            currentUser
          });
        })
    })
  });

  app.get('/sad', function (req, res) {
    var currentUser = req.user;
    Resource.count({
      mood: 'Sad'
    }).exec(function (err, count) {
      var random = Math.floor(Math.random() * count)
      Resource.findOne({
        mood: 'Sad'
      }).skip(random).exec(
        function (err, result) {
          console.log(result)
          res.render('sad', {
            resource: result,
            currentUser
          });
        })
    })
  });
}