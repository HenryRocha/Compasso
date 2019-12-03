const mongoose = require("../database");

const PROJECTQUIZ = new mongoose.Schema({
    _templateId: mongoose.ObjectId,
    deadline: Date,
    name: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  token: Number,
  quizzes: [PROJECTQUIZ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
