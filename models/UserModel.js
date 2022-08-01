const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// "passport-local-mongoose" handles passwords
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);