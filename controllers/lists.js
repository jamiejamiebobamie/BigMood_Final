const express = require('express');
const app = express();
const List = require('../models/list');
const Resource = require('../models/resource');
var admin = require('../app');

module.exports = function(app) {

  // CK: "List: resources :: reddit_Post: reddit_Comment"

  // // deep copy/clone
  // var listItem = jQuery.extend(true, {}, oldObject);
  


  // NEW list form
  app.get('/list', (req, res) => {
    res.render('list', {});
  });

  // CREATE NEW list
  app.post('/list', (req, res) => {
    List.create(req.body).then((list) => {
      console.log(list);
      res.redirect(`/list`)
    }).catch((err) => {
      console.log(err.message);
    })
  });

};