// MODULES
const mongoose = require("mongoose");

const USER = new mongoose.Schema({
  _projectId: mongoose.ObjectId,
  name: String,
  email: String,
  salt: String,
  hash: String,
  admin: Boolean,
  manager: Boolean,
});

const QUESTION = new mongoose.Schema({
  question: String,
  choices: Array,
  answers: Array,
  type: String,
  multiple: Boolean,
});

const QUIZ = new mongoose.Schema({
  _userId: mongoose.ObjectId,
  _projectId: mongoose.ObjectId,
  _templateId: mongoose.ObjectId,
  answerDate: {type: Date, default: Date.now},
  questions: [{type: mongoose.Schema.Types.Mixed, ref: QUESTION}],
});

const PROJECT = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  token: String,
  quizzes: mongoose.Schema.Types.Mixed,
});

const TEMPLATE = new mongoose.Schema({
  title: String,
  description: String,
  questions: Array,
});

const IDEA = new mongoose.Schema({
  _userId: mongoose.ObjectId,
  _projectId: mongoose.ObjectId,
  quizzes: JSON,
});

// EXPORTS
module.exports = {
  USER, QUIZ, PROJECT, TEMPLATE, IDEA,
};
