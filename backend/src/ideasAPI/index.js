// MODULES
const parser = require("body-parser");
const express = require("express");
const CONSTANTS = require("./constants");
const db = require("./database");


// APP
const app = express();
app.use(parser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  next();
});

app.listen(CONSTANTS.PORT, () => {
  console.log(`ideasAPI listening on port ${CONSTANTS.PORT}`);
});


// ROUTES
app.route("/idea").post(async (req, res, next) => {
  console.log("\nReceived POST request on /idea");
  console.log(req.body);

  const {ok, error, idea} = await db.postIdea(req.body);

  if (ok === true) {
    res.send({
      ok: true,
      message: "Idea created successfully",
      idea,
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not create idea",
    });
  }
});

app.route("/idea").get(async (req, res, next) => {
  console.log("\nReceived GET request on /idea");

  const {ok, error, idea} = await db.getIdea(req.query.userId, req.query.ideaId);

  if (ok === true) {
    res.send({
      ok: true,
      idea,
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not get idea",
    });
  }
});

app.route("/project/ideas").get(async (req, res, next) => {
  console.log("\nReceived GET request on /project/ideas");

  const {ok, error, ideas} = await db.getProjectIdeas(req.query.userId, req.query.projectId);

  if (ok === true) {
    res.send({
      ok: true,
      ideas,
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not get ideas",
    });
  }
});

app.route("/user/ideas").get(async (req, res, next) => {
  console.log("\nReceived GET request on /user/ideas");
  console.log(req.query.userId)
  const {ok, error, ideas} = await db.getUserIdeas(req.query.userId);

  if (ok === true) {
    console.log('OID')
    res.send({
      ideas,
    });
  } else {
    console.log(error);
    res.status(400).send({
      ok: false,
      message: "Could not get ideas",
    });
  }
});
