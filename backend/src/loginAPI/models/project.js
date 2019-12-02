const mongoose = require("../database");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  token: Number,
  quizzes: [PROJECTQUIZ],
});


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
