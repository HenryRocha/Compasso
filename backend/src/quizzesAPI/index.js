
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

app.route("/idea/quizzes").get(async (req, res, next) => {
  console.log("\nReceived GET request on /idea/quizzes");

  const {ok, error, quizzes} = await db.getQuizzesIdea(req.query.userId, req.query.ideaId);

  if (ok === true) {
    // for (i = 0; i < quizzes.length; i++) {
    //  quizzes[i].ideaId = req.query.ideaId;
    // }
    const response = [];
    quizzes.forEach((quizz) => {
      const q = {...quizz._doc, ideaId: req.query.ideaId};
      console.log(q);
      response.push(q);
    });
    res.send({
      quizzes: response,
    });
  } else {
    console.log(error);
    res.send({
      message: "Could not get quizzes",
    });
  }
});

app.route("/project/quizzes").get(async (req, res, next) => {
  console.log("\nReceived GET request on /project/quizzes");

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

app.route("/quiz").patch(async (req, res, next) => {
  console.log("\nReceived PATCH request on /quiz");

  const {ok, error} = await db.patchQuiz(req.body);

  if (ok === true) {
    res.send({
      quiz: req.body,
      ok: true,
      message: "Quiz patched successfully",
    });
  } else {
    console.log(error);
    res.send({
      ok: false,
      message: "Could not patch quiz",
    });
  }
});
