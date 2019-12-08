// MODULES
const mongoose = require("mongoose");
const CONSTANTS = require("./constants");
const SCHEMAS = require("./schemas");


// MODELS
const dbProjects = mongoose.model("projects", SCHEMAS.PROJECT);
const dbQuizzes = mongoose.model("quizzes", SCHEMAS.QUIZ);
const dbUsers = mongoose.model("users", SCHEMAS.USER);
const dbIdeas = mongoose.model("ideas", SCHEMAS.IDEA);


// DATABASE
mongoose.connect(CONSTANTS.DBURL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", () => {
  console.log("quizzesAPI could not connect to database");
});

db.once("open", () => {
  console.log("quizzesAPI successfully connected to the database");
});


// FUNCTIONS
async function getQuiz(userId, quizId) {
  try {
    const user = await dbUsers.findById("userId");
    const quiz = await dbQuizzes.findById(quizId);
    console.log(user, quiz);

    if (user && quiz && ((user.admin) || (user.manager && user._projectId.equals(quiz._projectId)) || (user._id.equals(quiz._userId)))) {
      return {
        ok: true,
        quiz,
      };
    }

    return {
      ok: false,
      error: "No user found or does not have enough privileges",
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

async function getQuizzesProject(userId, projectId) {
  try {
    const user = await dbUsers.findById(userId);
    const project = await dbProjects.findById(projectId);
    console.log(user, project);

    if (user && project && ((user.admin) || (user.manager && user._projectId.equals(project._id)))) {
      const quizzes = await dbQuizzes.find({_projectId: project._id});

      return {
        ok: true,
        quizzes,
      };
    }

    return {
      ok: false,
      error: "No user or project with that id found, or user does not have enough privileges",
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

async function getQuizzesIdea(userId, ideaId) {
  try {
    const user = await dbUsers.findById(userId);
    const idea = await dbIdeas.findById(ideaId);

    if (user && idea && ((user.admin) || (user.manager && user._projectId.equals(idea._projectId)) || (user._id.equals(idea._userId)))) {
      const quizzes = await dbQuizzes.find({_id: {$in: idea.quizzes}});

      return {
        ok: true,
        quizzes,
      };
    }

    return {
      ok: false,
      error: "No user or idea with that id found",
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

async function patchQuiz(quiz) {
  try {
    quiz._id = quiz.id;
    const user = await dbUsers.findById(quiz._userId);
    const originalQuiz = await dbQuizzes.findById(quiz._id);

    user.admin = true;
    if (user && originalQuiz && ((user.admin) || (user.manager && user._projectId.equals(originalQuiz._projectId)) || (user._id.equals(originalQuiz._userId)))) {
      console.log(typeof quiz.answerDate);
      if (quiz.answerDate === true) {
        console.log('oi')
        quiz.answerDate = new Date();
      }
      await dbQuizzes.updateOne({_id: quiz._id}, quiz);

      return {
        ok: true,
        quiz,
      };
    }

    return {
      ok: false,
      error: "No user found or does not have enough privileges",
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

module.exports = {
  getQuiz, getQuizzesProject, getQuizzesIdea, patchQuiz,
};
