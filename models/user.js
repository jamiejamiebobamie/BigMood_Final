const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
   createdAt: { type: Date },
   updatedAt: { type: Date },
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   likedContent: { type: Array, required: false },
   admin : { type: Boolean, required: true }
});

 // Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);