// This API is responsible for handling all project-related requests.


// MODULES
// Importing all the modules required.
require("dotenv").config();
const parser = require("body-parser");
const express = require("express");
const db = require("./db");


// CONSTANTS
// Declaring the app constant and the port this API will run on.
const app = express();
const port = process.env.PORT || 3001;


// APP
// Configure which JSON parser is to be used by the app.
app.use(parser.json());

// Configure where we can receive requests from and which methods and headers we allow.
app.use(function(req, res, next) {
  // Website you wish to allow to connect.
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow.
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // Request headers you wish to allow.
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");

  next();
});

// Making the API listen on the given port.
app.listen(port, function() {
  console.log("projectsAPI listening on port: " + port);
});

app.route("/project").post(async (req, res, next) => {
  console.log("Received POST request on /projects");
  console.log(req.body);

  db.getProjects();

  res.send({"status": "success"});
});
