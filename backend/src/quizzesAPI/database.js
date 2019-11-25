// MODULES
const mongoose = require("mongoose");
const CONSTANTS = require("./constants");
const SCHEMAS = require("./schemas");


// MODELS
const dbTemplates = mongoose.model("templates", SCHEMAS.TEMPLATE);
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
async function postQuiz(quiz) {
  try {
    const user = await dbUsers.findById(quiz._userId);
    const project = await dbProjects.findById(quiz._projectId);
    const template = await dbTemplates.findById(quiz._templateId);

    if (user && project && template) {
      const createdQuiz = await dbQuizzes.create(quiz);

      return {
        ok: true,
        error: {},
        _quizId: createdQuiz._id,
      };
    }

    return {
      ok: false,
      error: "No user, project or template found",
      _quizId: {},
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
      _quizId: {},
    };
  }
}

async function getQuiz(userId, quizId) {
  try {
    const user = await dbUsers.findById(userId);

    if (user) {
      let quiz = {};

      if (user.admin) {
        quiz = await dbQuizzes.findById(quizId);
      } if (user.manager) {
        quiz = await dbQuizzes.find({_id: quizId, _projectId: user._projectId});
      } else {
        quiz = await dbQuizzes.find({_id: quizId, _userId: user._id});
      }

      return {
        ok: true,
        quiz,
      };
    }

    return {
      ok: false,
      error: "No user found",
      quiz: {},
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
      quiz: {},
    };
  }
}

async function getQuizzesProject(userId, projectId) {
  try {
    const user = await dbUsers.findById(userId);

    if (user) {
      const project = await dbProjects.findById(projectId);

      if (project) {
        let quizzes = {};

        if (user.admin) {
          quizzes = await dbQuizzes.find({_projectId: project._id});
        } else if (user.manager) {
          quizzes = await dbQuizzes.find({_projectId: user._projectId});
        }

        return {
          ok: true,
          error: {},
          quizzes,
        };
      }
      return {
        ok: false,
        error: "No project with that id found",
        quizzes: {},
      };
    }

    return {
      ok: false,
      error: "No user found or user does not have enough privileges",
      quizzes: {},
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
      quizzes: {},
    };
  }
}

async function getQuizzesIdea(userId, ideaId) {
  try {
    const idea = await dbIdeas.findById(ideaId);

    if (idea) {
      const user = await dbUsers.findById(userId);

      if (user) {
        if (user.admin || (user.manager && user._projectId.equals(idea._projectId))) {
          const answeredQuizzes = [];
          console.log(idea);

          for (const quiz of Object.keys(idea.quizzes)) {
            if (idea.quizzes[quiz].answered === true) {
              answeredQuizzes.push(idea.quizzes[quiz]._quizId);
            }
          }

          const quizzes = await dbQuizzes.find({_id: {$in: answeredQuizzes}});

          return {
            ok: true,
            error: {},
            quizzes,
          };
        }
      } else {
        return {
          ok: false,
          error: "No user with that id found",
          quizzes: {},
        };
      }
    }

    return {
      ok: false,
      error: "No idea with that id found",
      quizzes: {},
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
      quizzes: {},
    };
  }
}

async function getQuizD0(userId, projectId) {
  try {
    const user = await dbUsers.findById(userId);
    const project = await dbProjects.findById(projectId);
    console.log(user, project);

    if (user && project) {
      if (user.admin || (user.manager && user._projectId.equals(idea._projectId)) || (user._id.equal(project._id))) {
        return {
          ok: true,
          error: {},
          quiz: project.quizzes.D0,
        };
      }
    }

    return {
      ok: false,
      error: "No user or project with that id found",
      quizzes: {},
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
      quizzes: {},
    };
  }
}

module.exports = {
  postQuiz, getQuiz, getQuizzesProject, getQuizzesIdea, getQuizD0,
};
