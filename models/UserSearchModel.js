const mongoose = require("mongoose");

// Track most recent user search
const UserSearchSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  prev_search: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("UserSearch", UserSearchSchema);