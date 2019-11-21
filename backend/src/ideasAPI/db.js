// MODULES
// Importing all the modules required.
require("dotenv").config();
const mongoose = require("mongoose");


// CONSTANTS
// Declaring the database URL. You need to have a .env file with this variable declared,
// otherwise the const URL will be set no undefined, since we don't have the environment
// variable declared.
const URL = (process.env.dbURL) ? process.env.dbURL : "mongodb://localhost/noderest";

// Idea Document JSON structure.
const ideasSchema = new mongoose.Schema({
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

// Connecting to the ideas collection.
const dbIdeas = mongoose.model("ideas", ideasSchema);
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

async function getIdeas(userId, admin) {
  try {
    // Declaring the ideas variable...
    let ideas = {};

    // If the user is an admin, we get all the ideas.
    if (admin == true) {
      // Getting all the ideas.
      ideas = await dbIdeas.find({});
    } else {
      // Getting the ideas from a specific user.
      ideas = await dbIdeas.find({_userId: userId});
    }

    return {
      ok: true,
      error: {},
      ideas: ideas,
    };
  } catch (err) {
    // If an error occurred, we return that error.
    return {
      ok: false,
      error: err,
      ideas: {},
    };
  }
};

async function addIdea(idea) {
  try {
    await dbIdeas.create(idea);

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

module.exports = {getUser, getIdeas, addIdea};
