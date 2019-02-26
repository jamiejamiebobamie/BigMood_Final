// INITIALIZE ALLL THE THINGS
const express = require('express');
const bodyParser = require('body-parser'); //for JSON data
const expressValidator = require('express-validator');
const methodOverride = require('method-override'); // CK: puts something when user posts it
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 9000;
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');

// MIDDLEWARE
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/bigmood-final'), { useNewUrlParser: true }); // heroku db || local
app.use(methodOverride('_method')) // CK: override with POST having ?_method=DELETE or ?_method=PUT
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // CK: setting defaults or it won't know what to show
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // CK: this bit must come below const app init AND before routes. **Uncertain about whether extended should be true or false
app.use(expressValidator()); // CK: this MUST ALWAYS come AFTER body parser init
app.use(express.static('public')); // sample images from past projects for testing

app.use(cookieParser());
// CK: This works. I am booted when I attempt to access pages that we've told the program I shouldn't be able to access without being auth'd. So, yay!
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
  // CK: error message for /list "each doesn't match if - 12:3"
  }).unless({path: ["/", "/login", "/sign-up", "/list", "/resources/:id/edit", "/resources/new", "/resources", "/resources/:id", "/index"] }) // CK: Don't need to be auth'd (aka all that stuff inside "app.use(jwt({}))") to go to these pages
  // CK: Originally included paths: "/", "/login", "/sign-up". I have added everything for now just to allow myself to easily see what routes are working, etc., without having to authorize myself first. Smol time saver
  // CK: Once a lot of stuff has been added, PUT IT BACK TO JUST THE SELECT FEW PATHS THAT WERE THERE BEFORE
);

// REQUIRING CONTROLLERS
require('./controllers/auth.js')(app);
require('./controllers/lists.js')(app);
require('./controllers/resources.js')(app);



app.listen(port, () => {
  console.log('App listening on port ' + port + '!');
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
