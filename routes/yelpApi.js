const express = require("express");
const axios = require("axios");

const yelpApiRoutes = express.Router();

//----- Retrieve search results
yelpApiRoutes.post("/api/yelp", (req, res) => {
  const apiEndpoint = "https://api.yelp.com/v3/businesses";
  const params = `/search?location=${req.body.location}&price=${req.body.price}&open_now=${req.body.open}`;
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
      businesses: apiRes.data.businesses
    })
  })
  .catch(err => console.log(err));
});

module.exports = yelpApiRoutes;