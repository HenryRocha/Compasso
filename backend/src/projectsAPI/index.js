// This API is responsible for handling all projects-related requests.


// MODULES
// Importing all the modules required.
require("dotenv").config();
const parser = require("body-parser");
const express = require("express");
const db = require("./db");
const ObjectId = require("mongoose").Types.ObjectId;


// CONSTANTS
// Declaring the app constant and the port this API will run on.
const app = express();
const port = process.env.PORT || 3002;


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


app.get("/projects", function(req, res, next) { // TODO: check get request
  const name = req.body.project;
  const contactPoint = req.body.contact;
  const interactions = req.body.quiz;
});


app.post("/projects", function(req, res, next) {
  const projectInfo = {
    _companyId: new ObjectId(req.body.companyId),
    name: req.body.name,
    contact: req.body.contact,
    token: Math.round(Math.random() * (9999-1000) + 1000),
  };

  db.addProject(projectInfo).then((resp) => res.send(resp)).catch((err) => console.log(err));
});


app.listen(port, function() {
  console.log("App running");
});
