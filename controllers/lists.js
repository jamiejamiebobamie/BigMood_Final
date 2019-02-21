const express = require('express');
const app = express();
const List = require('../models/list');
const Resource = require('../models/resource');
var admin = require('../app');

module.exports = function(app) {

    // NEW resource form
    app.get('/lists', (req, res) => {
      res.render('list', {});
  });

    // CREATE NEW resource
    app.post('/lists', (req, res) => {
      List.create(req.body).then((list) => {
        console.log(list);
        res.redirect(`/lists`)

      }).catch((err) => {
        console.log(err.message);
      })
  });

};