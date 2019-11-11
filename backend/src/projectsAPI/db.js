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
  _userId: mongoose.ObjectId,
  _companyId: mongoose.ObjectId,
  name: String,
  description: String,
});

// User Document JSON structure.
const usersSchema = new mongoose.Schema({
  company: mongoose.ObjectId,
  name: String,
  email: String,
  hash: String,
  salt: String,
});

// Connecting to the projects collection.
const dbProjects = mongoose.model("projects", projectsSchema);
const dbUsers = mongoose.model("users", usersSchema);


// DATABASE
// Connecting to the the Mongo client.
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// If we could not connect to the database...
db.on("error", function() {
  console.log("Could not connect to the database");
});

// If we successfully connectprojected to the database...
db.once("open", function() {
  console.log("Successfully connected to the database");
});


// FUNCTIONS
async function getUser(userId) {
  try {
    // Looking for an user with that ID.
    const user = await dbUsers.findById(userId);

    return {
      ok: true,
      error: {},
      user: user,
    };
  } catch (err) {
    // If an error occurred, we return that error.
    return {
      ok: false,
      error: err,
      user: {},
    };
  }
};

async function getProjects(userId, admin) {
  try {
    // Declaring the projects variable...
    let projects = {};

    // If the user is an admin, we get all the projects.
    if (admin == true) {
      // Getting all the projects.
      projects = await dbProjects.find({});
    } else {
      // Getting the projects from a specific user.
      projects = await dbProjects.find({_userId: userId});
    }

    return {
      ok: true,
      error: {},
      projects: projects,
    };
  } catch (err) {
    // If an error occurred, we return that error.
    return {
      ok: false,
      error: err,
      projects: {},
    };
  }
};

async function addProject(project) {
  try {
    await dbProjects.create(project);

    return {
      ok: true,
      error: {},
    };
  } catch (err) {
    // If an error occurred, we return that error.
    return {
      ok: false,
      error: err,
    };
  }
}

module.exports = {getUser, getProjects, addProject};
