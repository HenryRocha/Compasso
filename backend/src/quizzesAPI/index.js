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
  console.log(`quizzesAPI listening on port ${CONSTANTS.PORT}`);
});


// ROUTES
app.route("/quiz").post(async (req, res, next) => {
  console.log("\nReceived POST request on /quiz");

  const {ok, error, _quizId} = await db.postQuiz(req.body);

  if (ok === true) {
    res.send({
      ok: true,
      message: "Quiz created successfully",
      _quizId,
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not create quiz",
    });
  }
});

app.route("/quiz").get(async (req, res, next) => {
  console.log("\nReceived GET request on /quiz");

  const {ok, error, quiz} = await db.getQuiz(req.query.userId, req.query.quizId);

  if (ok === true) {
    res.send({
      ok: true,
      quiz,
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not get quiz",
    });
  }
});

app.route("/quizzes/project").get(async (req, res, next) => {
  console.log("\nReceived GET request on /quizzes/projects");

  const {ok, error, quizzes} = await db.getQuizzesProject(req.query.userId, req.query.projectId);

  if (ok === true) {
    res.send({
      ok: true,
      quizzes,
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not get quizzes",
    });
  }
});

app.route("/quizzes/idea").get(async (req, res, next) => {
  console.log("\nReceived GET request on /quizzes/idea");

  const {ok, error, quizzes} = await db.getQuizzesIdea(req.query.userId, req.query.ideaId);

  if (ok === true) {
    res.send({
      ok: true,
      quizzes,
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not get quizzes",
    });
  }
});
