// This API is responsible for handling all projects-related requests.


// MODULES
// Importing all the modules required.
require("dotenv").config();
const parser = require("body-parser");
const express = require("express");
const db = require("./db");
const urlencodedParser = parser.urlencoded({ extended: true })


// CONSTANTS
// Declaring the app constant and the port this API will run on.
const app = express();
const port = process.env.PORT || 3002;


// APP
// Configure which JSON parser is to be used by the app.
app.use(urlencodedParser);
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


// Request that get all projects in db (admin only)
app.get("/projects", function(req, res, next) {
  db.getProjects(req.query.userId).then((resp) => res.send(resp)).catch((err) => console.log(err));
});


// Request that get a specific project (admin and manager only)
app.get("/project", function(req, res, next) {
  db.getProject(req.query.projectId, req.query.userId).then((resp) => res.send(resp)).catch((err) => console.log(err));
});

// Request that create a project
app.post("/projects", urlencodedParser, function(req, res, next) {
  const projectInfo = {
    title: req.body.title,
    description: req.body.description,
    email: req.body.email,
    token: Math.round(Math.random() * (9999 - 1000) + 1000),
    quizzes: JSON.parse(req.body.quizzes),
  };

  console.log(req.body)
  

 
  
  
  

  db.addProject(projectInfo).then((resp) => res.send(resp)).catch((err) => console.log(err));
});


app.listen(port, function() {
  console.log("projectsAPI listening on port " + port);
});
