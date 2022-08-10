const mongoose = require("mongoose");

const UserBarsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  bars: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("UserBars", UserBarsSchema);