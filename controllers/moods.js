const Resource = require('../models/resource');

module.exports = function (app) {

app.get('/angry', (req, res) => {
  var currentUser = req.user;
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
        // "Tada! random user"
        console.log(result)
        res.render('angry', {
          resource: result,
          currentUser
        });
      })
  })
});
}
