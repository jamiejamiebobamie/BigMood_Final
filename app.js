const express = require('express');

// var firebase = require('firebase');

// var fireApp = firebase.initializeApp({
//   apiKey: '<your-api-key>',
//   authDomain: '<your-auth-domain>',
//   databaseURL: '<your-database-url>',
//   projectId: '<your-cloud-firestore-project>',
//   storageBucket: '<your-storage-bucket>',
//   messagingSenderId: '<your-sender-id>'
// });

const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
var admin = false;




//middleware for JSON data
const bodyParser = require('body-parser');

//middleware for putting something when you post it
const methodOverride = require('method-override');

const Resource = require('./models/resource');
const resources = require('./controllers/resources');

const port = process.env.PORT || 9000;

//must come below const app, but before routes
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

 //sample images from past projects for testing purposes
app.use(express.static('public'));


//local host database
//mongoose.connect('mongodb://localhost/rotten-potatoes');

//heroku database.
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes'), { useNewUrlParser: true });


//views middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use( resources);

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

app.listen(port);

module.exports = app;
