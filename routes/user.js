const express = require("express");
// Models
const UserBars = require("../models/UserBarsModel");

const userRoutes = express.Router();

//----- Add bar for current user
userRoutes.post("/api/user/addBar", (req, res) => {
  // Check for valid session
  if(req.user) {
    // Find bars for current user
    UserBars.findOne(
      {user_id: req.user._id}
    )
    .then(userBar => {
      // Check if doc exists
      let barsCopy
      if(userBar) {
        //--- Doc exists
        barsCopy = [...userBar.bars];
        // Check if bar is already added
        let valid = true;
        for(let bar of barsCopy) {
          if(bar.id === req.body.bar.id) {
            valid = false;
            break;
          }
        }
        if(valid) {
          barsCopy.push(req.body.bar);
        }
      } else {
        //--- Doc DNE
        barsCopy = [req.body.bar];
      }

      // Update bars for current user
      UserBars.findOneAndUpdate(
        {user_id: req.user._id},
        {bars: barsCopy},
        {upsert: true}  // create if DNE
      )
      .then(userBar2 => {
        res.json({ success: true });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  } else {
    res.json({ success: false });
  }
});

//----- Return bars for current user
userRoutes.get("/api/user/bars", (req, res) => {
  // Find bars for current user
  UserBars.findOne(
    {user_id: req.user._id}
  )
  .then(userBar => {
    // Check if doc exists
    let barsCopy;
    if(userBar) {
      barsCopy = [...userBar.bars];
    } else {
      barsCopy = [];
    }

    res.json({ bars: barsCopy });
  })
  .catch(err => console.log(err));
});

module.exports = userRoutes;