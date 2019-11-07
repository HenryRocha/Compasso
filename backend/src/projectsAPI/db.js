// MODULES
// Importing all the modules required.
require("dotenv").config();
const mongoose = require("mongoose");


// CONSTANTS
// Declaring the database URL. You need to have a .env file with this variable declared,
// otherwise the const URL will be set no undefined, since we don't have the environment
// variable declared.
const URL = process.env.dbURL;

// Project Document JSON structure.
const projectsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: String,
  description: String,
});

// Connectin to the projects collection.
const dbProjects = mongoose.model("projects", projectsSchema);


// DATABASE
// Connecting to the the Mongo client.
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// If we could not connect to the database...
db.on("error", function() {
  console.log("Could not connect to the database");
});

// If we successfully connected to the database...
db.once("open", function() {
  console.log("Successfully connected to the database");
});


// FUNCTIONS
async function getProjects(project) {
  if (project != undefined) {
    dbProjects.find({})
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return {
      "status": "fail",
      "error": "PROJECT_UNDEFINED",
    };
  }
};

module.exports = {getProjects};
