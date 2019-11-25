const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  questions: {
    type: Array,
  },
  companies: {
    type: [String],
  },
});


const Template = mongoose.model("Template", TemplateSchema);
module.exports = Template;
