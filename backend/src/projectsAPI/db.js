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
  console.log("Could not connect to the database");
});

db.once("open", function() {
  console.log("Successfully connected to the database");
});


const projectSchema = new mongoose.Schema({
  _companyId: mongoose.ObjectId,
  name: String,
  contact: String,
  token: Number,
});

const userSchema = new mongoose.Schema({
  company: mongoose.ObjectId,
  name: String,
  email: String,
  hash: String,
  salt: String,
});

const dbCompany = mongoose.model("projects", projectSchema);
const dbUsers = mongoose.model("users", userSchema);

async function getUser(userID) {
  return new Promise(function(resolve, reject) {
    dbUsers.findById(userID).then((resp) => {
      if (resp != null) {
        resolve({"found": true, "message": "Usuário encontrado!"});
      } else {
        resolve({"found": false, "message": "Usuário não encontrado!"});
      }
    }).catch((err) => {
      console.log(err);
    });
  });
}

async function addProject(projectInfo) {
  return new Promise(function(resolve, reject) {
    dbCompany.findOne({_companyId: projectInfo._companyId}).then((resp) => {
      if (resp === undefined || resp === null) {
        dbCompany.create(projectInfo).then((resp) => {
          resolve({
            id: resp._id,
            companyId: resp._companyId,
            name: resp.name,
            contact: resp.contact,
            token: resp.token,
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

module.exports = {getUser, addProject};
