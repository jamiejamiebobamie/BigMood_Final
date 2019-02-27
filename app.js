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
require('./database/bmdb');

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

// ring ring... anyone there?
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


// CK: gonna toss this out, trying other auth
// // CK: This works. I am booted when I attempt to access pages that we've told the program I shouldn't be able to access without being auth'd. So, yay!
// // CK: I have NOT YET CHECKED to see if it works for authenticated users
// app.use(
//   jwt({
//     secret: "shhhhhhared-secret",
//     getToken: function fromHeaderOrCookie(req) {
//       //fromHeaderOrQuerystring
//       if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
//         return req.headers.authorization.split(" ")[1];
//       } else if (req.cookies && req.cookies.token) {
//         return req.cookies.token;
//       }
//       return null;
//     }
//   }).unless({path: ["/", "/login", "/sign-up", "/lists-edit", "/lists-show", "/resources/:id/edit", "/resources/new", "/resources", "/resources/:id", "/index", "/angry", "/bored", "/frustrated", "/lonely", "/sad"] }) // CK: Don't need to be auth'd (aka all that stuff inside "app.use(jwt({}))") to go to these pages
//   // CK: Originally included only paths: "/", "/login", "/sign-up". I have added everything for now just to allow myself to easily see what routes are working, etc., without having to authorize myself first. Smol time saver
//   // CK: Once a lot of stuff has been added, PUT IT BACK TO JUST THE SELECT FEW PATHS THAT WERE THERE BEFORE. Possibly keep the moods in there?
//   // CK: Need to sign up / log in to save to the one solitary lonely list
// );
