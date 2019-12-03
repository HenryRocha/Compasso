const parser = require("body-parser");
const express = require("express");
const axios = require("axios");


// CONSTANTS
// Declaring the app constant and the port this API will run on.
const app = express();
const PORT = 80;
const ADDRESSES = {
  ideas: "http://localhost:8084",
  login: "http://localhost:5002",
  quizzes: "http://localhost:8085",
  projects: "http://localhost:3002",
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

app.route("/idea").post(async (req, res, next) => {
  try {
    const response = await axios.post(ADDRESSES.ideas + "/idea", req.body);
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/idea").get(async (req, res, next) => {
  try {
    const response = await axios.post(ADDRESSES.ideas + "/idea", {
      query: req.query,
    });
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/projects/ideas").get(async (req, res, next) => {
  try {
    const response = await axios.post(ADDRESSES.ideas + "/projects/ideas", {
      query: req.query,
    });
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/user/ideas").get(async (req, res, next) => {
  try {
    const response = await axios.post(ADDRESSES.ideas + "/user/ideas", {
      query: req.query,
    });
    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
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
      message: e.response.data.message,
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
      message: e.response.data.message,
    });
  }
});

app.route("/quiz").get(async (req, res, next) => {
  try {
    const response = await axios.get(ADDRESSES.quizzes + "/quiz", {
      query: req.query,
    });

    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/quiz").patch(async (req, res, next) => {
  try {
    const response = await axios.patch(ADDRESSES.quizzes + "/quiz", req.body);

    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/idea/quizzes").get(async (req, res, next) => {
  try {
    const response = await axios.get(ADDRESSES.quizzes + "/quizzes/idea", {
      query: req.query,
    });

    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/project/quizzes").get(async (req, res, next) => {
  try {
    const response = await axios.get(ADDRESSES.quizzes + "/quizzes/idea", {
      query: req.query,
    });

    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/projects").get(async (req, res, next) => {
  try {
    const response = await axios.get(ADDRESSES.projects + "/projects", {
      query: req.query,
    });

    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/projects").post(async (req, res, next) => {
  try {
    const response = await axios.post(ADDRESSES.projects + "/projects", req.body);

    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});

app.route("/project").get(async (req, res, next) => {
  try {
    const response = await axios.get(ADDRESSES.projects + "/project", {
      query: req.query,
    });

    res.status(response.status).send(response.data);
  } catch (e) {
    res.status(400).send({
      message: e.response.data.message,
    });
  }
});