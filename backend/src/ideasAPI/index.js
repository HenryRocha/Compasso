// This API is responsible for handling all idea-related requests.


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

app.route("/ideas").get(async (req, res, next) => {
  console.log("\nReceived GET request on /ideas.");
  console.log(req.query);

  // Getting the userId from the query.
  const userId = new ObjectId(req.query.userId);

  // Checking if we have a valid user.
  const {ok, error, user} = await db.getUser(userId);

  if (ok && user) {
    // Getting the ideas for that user...
    const {ok, error, ideas} = await db.getIdeas(user._id, user.admin);

    if (ok) {
      // Send the ideas back as a response.
      res.send({
        ok: true,
        ideas: ideas,
      });
    } else {
      // If an error occured...
      console.log(error);

      res.status(400).send({
        ok: false,
        message: "Could not get ideas.",
      });
    }
  } else {
    // If an error occured...
    console.log(error);

    res.status(400).send({
      ok: false,
      message: "Could not get ideas for that userId. Check if the userId is valid.",
    });
  }
}).post(async (req, res, next) => {
  console.log("Received POST request on /ideas.");
  console.log(req.body);

  // Creating the idea object.
  const idea = {
    _userId: new ObjectId(req.body.userId),
    _companyId: new ObjectId(req.body.companyId),
    name: req.body.name,
    description: req.body.description,
  };

  // Checking if we have a valid user.
  const {ok, error, user} = await db.getUser(idea._userId);
  console.log(ok, error, user);

  if (ok && user) {
    // Inserting the idea into the database.
    const {ok, error} = await db.addIdea(idea);

    if (ok) {
      // Send back ok to show we created the idea successfully.
      res.send({ok: true});
    } else {
    // If an error occured...
      console.log(error);

      res.status(400).send({
        ok: false,
        error: "Could not create idea.",
      });
    }
  } else {
    // If an error occured...
    console.log(error);

    res.status(400).send({
      ok: false,
      message: "Could not create idea for that userId. Check if the userId is valid.",
    });
  }
});
