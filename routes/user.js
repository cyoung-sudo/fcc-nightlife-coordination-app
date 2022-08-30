const express = require("express");
// Models
const UserBars = require("../models/UserBarsModel");
const UserSearch = require("../models/UserSearchModel");
const User = require("../models/UserModel");

const userRoutes = express.Router();

userRoutes.route("/api/user/bar")
  //----- Add bar for current user
  .post((req, res) => {
    // Check for valid session
    if(req.user) {
      // Find bars for current user
      UserBars.findOne(
        {user_id: req.user._id}
      )
      .then(userBar => {
        // Check if doc exists
        let barsCopy;
        let duplicate = false;
        if(userBar) {
          //--- Doc exists
          barsCopy = [...userBar.bars];
          // Check if bar is already added
          for(let bar of barsCopy) {
            if(bar.id === req.body.bar.id) {
              duplicate = true;
              break;
            }
          }
          if(!duplicate) {
            barsCopy.push(req.body.bar);
          }
        } else {
          //--- Doc DNE
          barsCopy = [req.body.bar];
        }

        // Check if bar is already added
        if(!duplicate) {
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
        } else {
          res.json({ success: false })
        }
      })
      .catch(err => console.log(err));
    } else {
      res.json({ success: false });
    }
  })
  //----- Remove bar for current user
  .delete((req, res) => {
    UserBars.findOne(
      {user_id: req.user._id}
    )
    .then(userBar => {
      // Filter-out bar to be deleted
      let barsCopy = [...userBar.bars].filter(bar => {
        return bar.id !== req.body.barId;
      });
      // Update bars for current user
      UserBars.findOneAndUpdate(
        {user_id: req.user._id},
        {bars: barsCopy}
      )
      .then(userBar2 => {
        res.json({ success: true });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
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

//----- Delete an account
userRoutes.delete('/api/user', (req, res) => {
  // Check for valid session
  if(req.session.passport !== undefined) {
    // Delete user-bars
    UserBars.findOneAndDelete({ user_id: req.session.user._id })
    .then(data => {
      // Delete recent-search
      UserSearch.findOneAndDelete({ user_id: req.session.user._id })
      .then(data2 => {
        // Delete user
        User.findByIdAndDelete(req.session.user._id)
        .then(user => {
          res.json({ success: true })
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  } else {
    res.json({ success: false });
  }
});

module.exports = userRoutes;