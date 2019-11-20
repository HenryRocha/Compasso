const parser = require("body-parser");
const express = require("express");
const axios = require("axios");


// CONSTANTS
// Declaring the app constant and the port this API will run on.
const app = express();
const PORT = 8080;
const ADDRESSES = {
  projects: "http://localhost:3001",
  login: "http://localhost:5002",
};

// APP
// Configure which JSON parser is to be used by the app.
app.use(parser.json());

// Configure where we can receive requests from and which methods and headers we allow.
app.use(function(req, res, next) {
  // Website you wish to allow to connect.
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow.
  res.setHeader("Access-Control-Allow-Methods", "POST");
  // Request headers you wish to allow.
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");

  next();
});

app.listen(PORT, () => console.log("Connected to port " + PORT + "!"));

app.route("/ideas").get(async (req, res, next) => {
  console.log("GET on /ideas");
  try {
    const response = await axios.get(ADDRESSES.ideas + "/ideas", {
      query: req.query,
    });
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
}).post(async (req, res, next) => {
  console.log("POST on /ideas");
  try {
    const response = await axios.post(ADDRESSES.ideas + "/ideas", req.body);
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.route("/user").post(async (req, res, next) => {
  console.log("Posting User");
  try {
    const response = await axios.post(ADDRESSES.login + "/auth/register", req.body);
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.route("/login").post(async (req, res, next) => {
  console.log("Posting User");
  try {
    const response = await axios.post(ADDRESSES.login + "/auth/authenticate", req.body);
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
