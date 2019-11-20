var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: String,
  },
  questions: {
    type: Array,
  },
  companies: {
      type: [String]
  }
});


var Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
