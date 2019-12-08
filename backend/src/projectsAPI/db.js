// MODULES
// Importing all the modules required.
require("dotenv").config();
const mongoose = require("mongoose");


// CONSTANTS
// Declaring the database URL. You need to have a .env file with this variable declared,
// otherwise the const URL will be set no undefined, since we don't have the environment
// variable declared.
const URL = (process.env.dbURL) ? process.env.dbURL : "mongodb://localhost/noderest";

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", function() {
  console.log("projectsAPI could not connect to the database");
});

db.once("open", function() {
  console.log("projectsAPI successfully connected to the database");
});


const PROJECTQUIZ = new mongoose.Schema({
  _templateId: mongoose.ObjectId,
  deadline: Date,
  name: String,
}, {_id: false});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  token: Number,
  quizzes: [PROJECTQUIZ],
});

const UserSchema = new mongoose.Schema({
  _projectId: mongoose.ObjectId,
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  salt: String,
  hash: String,
  admin: Boolean,
  manager: Boolean,
  projectToken: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const dbCompany = mongoose.model("projects", projectSchema);
const dbUsers = mongoose.model("users", UserSchema);

async function getUser(userID) {
  return new Promise(function(resolve, reject) {
    dbUsers.findById(userID).then((resp) => {
      if (resp != null) {
        resolve({"status": "true", "data": resp});
      } else {
        resolve({"status": "false", "data": resp});
      }
    }).catch((err) => {
      console.log(err);
    });
  });
}


async function getProject(projectID, userID) {
  return new Promise(function(resolve, reject) {
    getUser(userID).then((resp) => {
      if (resp.data.admin || resp.data.manager && resp.data._projectId.equals(projectID)) {
        dbCompany.findById(projectID).then((resp) => {
          resolve(resp);
        }).catch((err) => {
          console.log(err);
          resolve({"status": "error", "message" : "Não foi possivel achar projeto"});
        });
      } else {
        resolve({
          "status": "error",
          "message": "Voce nao tem permissao para acessar essa pagina",
        });
      }
    });
  });
}


async function getProjects(userID) {
  return new Promise(function(resolve, reject) {
    getUser(userID).then((resp) => {
      if (resp.data.admin && resp.data != null) {
        dbCompany.find().then((resp) => {
          resolve(resp);
        }).catch((err) => {
          console.log(err);
          resolve({"status": "error", "message" : "Não foi possivel localizar o projeto"});
        });
      } else {
        resolve({
          "status": "error",
          "message": "Voce não tem permissão para ver todos projetos",
        });
      }
    }).catch((err) => console.log(err));
  });
}


async function addProject(projectInfo) {
  return new Promise(function(resolve, reject) {
    dbCompany.findOne({title: projectInfo.title}).then((resp) => {
      if (resp === undefined || resp === null) {
        dbCompany.create(projectInfo).then((resp) => {
          resolve({
            title: resp.title,
            description: resp.description,
            email: resp.email,
            token: resp.token,
            quizzes: resp.quizzes,
          });
        }).catch((err) => {
          console.log(err);
        });
      } else {
        resolve({
          "status": "error",
          "message": "Já existe um projeto com essa empresa",
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  });
}


module.exports = {getUser, addProject, getProjects, getProject};

