const express = require("express");
const axios = require("axios");
// Models
const UserSearch = require("../models/UserSearchModel");

const yelpApiRoutes = express.Router();

//----- Retrieve search results
yelpApiRoutes.post("/api/yelp/search", (req, res) => {
  const apiEndpoint = "https://api.yelp.com/v3/businesses";
  const params = `/search?location=${req.body.location}&price=${req.body.price}&open_now=${req.body.open}`;
  const staticParams = "&categories=bars&limit=50&sort_by=best_match";

  // Check for valid session
  if(req.session.passport !== undefined) {
    //--- Valid session
    // Request search results from API
    axios({
      method: "get",
      withCredentials: true,
      url: apiEndpoint + params + staticParams,
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    })
    .then(apiRes => {
      // Track most recent search
      UserSearch.findOneAndUpdate(
        {user_id: req.user._id},
        {prev_search: [req.body.location, req.body.price, req.body.open]},
        {upsert: true}  // create if DNE
      )
      .then(userSearch => {
        res.json({ businesses: apiRes.data.businesses })
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  } else {
    //--- Invalid session
    // Request search results from API
    axios({
      method: "get",
      withCredentials: true,
      url: apiEndpoint + params + staticParams,
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    })
    .then(apiRes => {
      res.json({ businesses: apiRes.data.businesses })
    })
    .catch(err => console.log(err));
  }
});

//----- Retrieve bar details
yelpApiRoutes.post("/api/yelp/details", (req, res) => {
  const apiEndpoint = "https://api.yelp.com/v3/businesses";
  const params = `/${req.body.barId}`;

  // Request bar details from API
  axios({
    method: "get",
    withCredentials: true,
    url: apiEndpoint + params,
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  .then(apiRes => {
    res.json({ bar: apiRes.data })
  })
  .catch(err => console.log(err));
});

//----- Retrieve most recent user search-results
yelpApiRoutes.get("/api/yelp/recent", (req, res) => {
  // Find recent-search for given user
  UserSearch.findOne({ user_id: req.user._id })
  .then(userSearch => {
    // Check if recent-search exists
    if(userSearch) {
      //--- Recent-search exists
      let location = userSearch.prev_search[0];
      let price = userSearch.prev_search[1];
      let open = userSearch.prev_search[2];

      const apiEndpoint = "https://api.yelp.com/v3/businesses";
      const params = `/search?location=${location}&price=${price}&open_now=${open}`;
      const staticParams = "&categories=bars&limit=50&sort_by=best_match";

      // Request search results from API
      axios({
        method: "get",
        withCredentials: true,
        url: apiEndpoint + params + staticParams,
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`
        }
      })
      .then(apiRes => {
        res.json({ 
          success: true,
          businesses: apiRes.data.businesses 
        })
      })
      .catch(err => console.log(err));
    } else {
      //--- Recent-search DNE
      res.json({ success: false })
    } 
  })
  .catch(err => console.log(err));
});

module.exports = yelpApiRoutes;