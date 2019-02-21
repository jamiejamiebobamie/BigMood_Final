// INITIALIZE ALLL THE THINGS
const express = require('express');
const bodyParser = require('body-parser'); //for JSON data
const expressValidator = require('express-validator');
const methodOverride = require('method-override'); // puts something when user posts it
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 9000;

// MIDDLEWARE
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/bigmood-final'), { useNewUrlParser: true }); // heroku db || local
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE or ?_method=PUT
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // setting defaults or it won't know what to show
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // this bit must come below const app init AND before routes
app.use(expressValidator()); // this MUST ALWAYS come AFTER body parser init
app.use(express.static('public')); // sample images from past projects for testing 

// REQUIRING CONTROLLERS
require('./controllers/lists.js')(app);
require('./controllers/resources.js')(app);

//ROOT ROUTE
//https://stackoverflow.com/questions/39277670/how-to-find-random-record-in-mongoose
app.get('/', (req, res) => {
    Resource.count().exec(function (err, count) {
      // "Get a random entry"
      var random = Math.floor(Math.random() * count)
      // "Again query all users but only fetch one offset by our random #""
      Resource.findOne().skip(random).exec(
        function (err, result) {
          // "Tada! random user"
          console.log(result)
          res.render('home', { resource: result });
        })
    })
});

app.listen(port, () => {
  console.log('App listening on port ' + port + '!');
});

module.exports = app;


// ENDGAME: Ultimately, we want to authenticate with Firebase. At that point, the following lines should be placed at the top with the initializations and un-commented back in.
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