// INITIALIZE ALLL THE THINGS
const express = require('express');
const bodyParser = require('body-parser'); //for JSON data
const expressValidator = require('express-validator');
const methodOverride = require('method-override'); // puts something when user posts it
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 9000;
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');

// MIDDLEWARE
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/bigmood-final'), { useNewUrlParser: true }); // heroku db || local
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE or ?_method=PUT
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // setting defaults or it won't know what to show
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // this bit must come below const app init AND before routes
app.use(expressValidator()); // this MUST ALWAYS come AFTER body parser init
app.use(express.static('public')); // sample images from past projects for testing

app.use(cookieParser());
app.use(
  jwt({
    secret: "shhhhhhared-secret",
    getToken: function fromHeaderOrCookie(req) {
      //fromHeaderOrQuerystring
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    }
  }).unless({ path: ["/", "/login", "/sign-up"] })
);

// REQUIRING CONTROLLERS
require('./controllers/lists.js')(app);
require('./controllers/resources.js')(app);
require('./controllers/auth.js')(app);


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
