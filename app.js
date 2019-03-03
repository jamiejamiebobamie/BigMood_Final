// INITIALIZE ALLL THE THINGS
const express = require('express');
const bodyParser = require('body-parser'); //for JSON data
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 9000;
const app = express();
const checkAuth = (function(req, res, next) {
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, {complete: true}) || {};
    req.user = decodedToken.payload;
  }
  next();
});

// dotenv
require('dotenv').config();

// database
const db = require('./database/bmdb');

// reducing deprecation warnings
mongoose.set('useFindAndModify', false) // CK: because of all the deprecation warnings when using findByIdAndUpdate. This is supposed to silence that. https://github.com/Automattic/mongoose/issues/6880
mongoose.set('useCreateIndex', true); // CK: Another deprecation warning fix. https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat

// MIDDLEWARE
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/bigmood-final'), { useNewUrlParser: true }); // CK: heroku db || local
app.use(methodOverride('_method')) // CK: override with POST having ?_method=DELETE or ?_method=PUT
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // CK: setting defaults or it will not know what to show
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // CK: this bit must come below const app init AND before routes. **Uncertain about whether extended should be true or false**
app.use(expressValidator()); // CK: this MUST ALWAYS come AFTER body parser init
app.use(checkAuth);
app.use(express.static('public')); // sample images from past projects for testing

// REQUIRING CONTROLLERS
require('./controllers/auth.js')(app);
require('./controllers/lists.js')(app);
require('./controllers/resources.js')(app);

const User = require('./models/user');
const List = require('./models/list');
const Resource = require('./models/resource');

// ring ring... anyone there?
app.listen(port, () => {
  console.log('App listening on port ' + port + '!');
});



app.get('/angry', (req, res) => {
    var currentUser = req.user;
    Resource.count({ mood: 'Angry'}).exec(function (err, count) {
      // "Get a random entry"
      var random = Math.floor(Math.random() * count)
      // "Again query all users but only fetch one offset by our random #""
      Resource.findOne({ mood: 'Angry'}).skip(random).exec(
        function (err, result) {
          // "Tada! random user"
          console.log(result)
          res.render('moods_home/angry', { resource: result, currentUser });
        })
    })
});

app.post('/:resourceId', (req, res) => {
    var currentUser = req.user;
    const save = req.originalUrl
    const saved = save.substring(1)
    console.log(db)
    // const save = window.location.href
    // const save = document.URL;
    // const save = req.resource._id
    // console.log(save)
    db.currentUser.update( null, { $push: { likedContent: saved } })
    res.render('moods_home/angry', { resource: currentUser });
});

app.get('/bored', (req, res) => {
    Resource.count({ hashtag: 'MOOD: Bored' }).exec(function (err, count) {
      // "Get a random entry"
      var random = Math.floor(Math.random() * count)
      // "Again query all users but only fetch one offset by our random #""
      Resource.findOne({ hashtag: 'MOOD: Bored' }).skip(random).exec(
        function (err, result) {
          // "Tada! random user"
          console.log(result)
          res.render('moods_home/bored', { resource: result });
        })
    })
});

app.get('/frustrated', (req, res) => {
    Resource.count({ hashtag: 'MOOD: Frustrated' }).exec(function (err, count) {
      // "Get a random entry"
      var random = Math.floor(Math.random() * count)
      // "Again query all users but only fetch one offset by our random #""
      Resource.findOne({ hashtag: 'MOOD: Frustrated' }).skip(random).exec(
        function (err, result) {
          // "Tada! random user"
          console.log(result)
          res.render('moods_home/frustrated', { resource: result });
        })
    })
});

app.get('/lonely', (req, res) => {
    Resource.count({ hashtag: 'MOOD: Lonely' }).exec(function (err, count) {
      // "Get a random entry"
      var random = Math.floor(Math.random() * count)
      // "Again query all users but only fetch one offset by our random #""
      Resource.findOne({ hashtag: 'MOOD: Lonely' }).skip(random).exec(
        function (err, result) {
          // "Tada! random user"
          console.log(result)
          res.render('moods_home/lonely', { resource: result });
        })
    })
});

app.get('/sad', (req, res) => {
    Resource.count({ hashtag: 'MOOD: Sad' }).exec(function (err, count) {
      // "Get a random entry"
      var random = Math.floor(Math.random() * count)
      // "Again query all users but only fetch one offset by our random #""
      Resource.findOne({ hashtag: 'MOOD: Sad' }).skip(random).exec(
        function (err, result) {
          // "Tada! random user"
          console.log(result)
          res.render('moods_home/sad', { resource: result });
        })
    })
});



module.exports = app;

// CK: Ultimately, we want to authenticate with Firebase. At that point, the following lines should be placed at the top with the initializations and un-commented back in.
// var admin = false;
// var firebase = require('firebase');
// var fireApp = firebase.initializeApp({
//   apiKey: '<your-api-key>',
//   authDomain: '<your-auth-domain>',
//   databaseURL: '<your-database-url>',
//   projectId: '<your-cloud-firestore-project>',
//   storageBucket: '<your-storage-bucket>',
//   messagingSenderId: '<your-sender-id>'
// });
