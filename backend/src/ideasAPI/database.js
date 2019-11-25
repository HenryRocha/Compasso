// MODULES
const mongoose = require("mongoose");
const CONSTANTS = require("./constants");
const SCHEMAS = require("./schemas");


// MODELS
const dbTemplates = mongoose.model("templates", SCHEMAS.TEMPLATE);
const dbProjects = mongoose.model("projects", SCHEMAS.PROJECT);
const dbUsers = mongoose.model("users", SCHEMAS.USER);
const dbIdeas = mongoose.model("ideas", SCHEMAS.IDEA);
const IdeaQuizModel = mongoose.model("t", SCHEMAS.IDEAQUIZ);


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
    const project = await dbProjects.findById(idea._projectId);

    if (project) {
      const user = await dbUsers.findById(idea._userId);

      if (user && (user.admin || (user.manager && user._projectId.equals(project._id)) || (user._projectId.equals(project._id)))) {
        for (const quiz of Object.keys(project.quizzes)) {
          let template = {};

          if (quiz !== "D0") {
            let newQuiz = {};

            newQuiz = project.quizzes[quiz];
            newQuiz._quizId = null;
            newQuiz.answered = false;
            newQuiz.name = quiz;

            idea.quizzes.push(new IdeaQuizModel(newQuiz));

            template = await dbTemplates.findById(newQuiz._templateId);
          } else {
            idea.quizzes[0] = new IdeaQuizModel(idea.quizzes[0]);
            template = await dbTemplates.findById(idea.quizzes[0]._templateId);
          }

          if (!template) {
            return {
              ok: false,
              error: `No template found for quiz ${quiz}`,
            };
          }
        }

        await dbIdeas.create(idea);

        return {
          ok: true,
          error: {},
        };
      }
      return {
        ok: false,
        error: "No user found or user does not have enough privileges",
      };
    }

    return {
      ok: false,
      error: "No project with that id found",
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

async function getIdeas(userId) {
  try {
    const user = await dbUsers.findById(userId);

    if (user) {
      let ideas = {};

      if (user.admin) {
        ideas = await dbIdeas.find({});
      } else if (user.manager) {
        ideas = await dbIdeas.find({_projectId: user._projectId});
      } else {
        ideas = await dbIdeas.find({_userId: user._id});
      }

      return {
        ok: true,
        ideas,
      };
    }
    return {
      ok: false,
      error: "No user found",
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

    if (user) {
      if (user.admin) {
        const idea = await dbIdeas.findById(ideaId);

        return {
          ok: true,
          idea,
        };
      } if (user.manager) {
        const idea = await dbIdeas.find({_id: ideaId, _projectId: user._projectId});

        return {
          ok: true,
          idea,
        };
      }
      const idea = await dbIdeas.find({_id: ideaId, _userId: user._id});

      return {
        ok: true,
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

module.exports = {postIdea, getIdeas, getIdea};
