/* eslint-disable new-cap */
// MODULES
const mongoose = require("mongoose");
const CONSTANTS = require("./constants");
const SCHEMAS = require("./schemas");

const ObjectId = mongoose.ObjectId();


// MODELS
const dbTemplates = mongoose.model("templates", SCHEMAS.TEMPLATE);
const dbProjects = mongoose.model("projects", SCHEMAS.PROJECT);
const dbQuizzes = mongoose.model("quizzes", SCHEMAS.QUIZ);
const dbUsers = mongoose.model("users", SCHEMAS.USER);
const dbIdeas = mongoose.model("ideas", SCHEMAS.IDEA);
const quizModel = mongoose.model("quiz", SCHEMAS.QUIZ);


// DATABASE
mongoose.connect(CONSTANTS.DBURL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", () => {
  console.log("ideasAPI could not connect to database");
});

db.once("open", () => {
  console.log("ideasAPI successfully connected to the database");
});


// FUNCTIONS
async function postIdea(idea) {
  try {
    const user = await dbUsers.findById(new ObjectId(idea._userId));
    const project = await dbProjects.findById(new ObjectId(idea._projectId));

    if (user && project) {
      const quizIdList = [];

      for (const quiz in project.quizzes) {
        if (quiz) {
          const template = await dbTemplates.findById(project.quizzes[quiz]._templateId);

          let newQuiz = {
            _userId: idea._userId,
            _projectId: idea._projectId,
            _templateId: idea._templateId,
            deadline: project.quizzes[quiz].deadline,
            questions: template.questions,
            name: project.quizzes[quiz].name,
          };

          newQuiz = new quizModel(newQuiz);

          const createdQuiz = await dbQuizzes.create(newQuiz);

          quizIdList.push(createdQuiz._id);
        }
      }

      idea.quizzes = quizIdList;

      createdIdea = await dbIdeas.create(idea);

      return {
        ok: true,
        error: {},
      };
    }
    return {
      ok: false,
      error: "No user or project found with that id",
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

async function getIdea(userId, ideaId) {
  try {
    const user = await dbUsers.findById(userId);
    const idea = await dbIdeas.findById(ideaId);

    if (user && idea && ((user.admin) || (user.manager && user._projectId.equals(idea._projectId)) || (user._id.equals(idea._userId)))) {
      return {
        ok: true,
        error: {},
        idea,
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

async function getProjectIdeas(userId, projectId) {
  try {
    const user = await dbUsers.findById(userId);
    const project = await dbProjects.findById(projectId);

    if (user && project && ((user.admin) || (user.manager && user._projectId.equals(project._id)))) {
      const ideas = await dbIdeas.find({_projectId: project._id});

      return {
        ok: true,
        error: {},
        ideas,
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

async function getUserIdeas(userId) {
  try {
    const user = await dbUsers.findById(userId);

    if (user) {
      const ideas = await dbIdeas.find({_userId: user._id});

      return {
        ok: true,
        error: {},
        ideas,
      };
    }

    return {
      ok: true,
      error: "No user found with that id",
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

module.exports = {
  postIdea, getIdea, getProjectIdeas, getUserIdeas,
};
