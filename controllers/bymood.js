const Resource = require('../models/resource');

module.exports = function (app) {

    app.get('/:mood', function (req, res) {
        Resource.find({
            mood: {
                $all: [req.params.mood]
            }
        }).then(function (resources) {
            return random = mood[Math.floor(Math.random() * mood.length())];
        }).skip(random).exec(function (err, result) {
            res.render('by-mood', {
                resource: result
            });
        }).catch(function (err) {
            console.log(err.message);
        })
    })
}