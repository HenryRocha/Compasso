const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: Array,
});


const Template = mongoose.model("templates", TemplateSchema);
module.exports = Template;
