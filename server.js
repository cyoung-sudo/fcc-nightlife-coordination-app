//----- Imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const db = require("./config/conn"); // DB connection

//----- Middleware
app.use(cors());
app.use(express.json());

//----- Routes
 
//----- Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // Connect to DB when server starts
  db.connect();
  console.log(`Server is running on port: ${port}`);
});