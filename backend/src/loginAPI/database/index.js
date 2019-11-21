require("dotenv").config();
const mongoose = require("mongoose");

const URL = (process.env.dbURL) ? process.env.dbURL : "mongodb://localhost/noderest";

mongoose.connect(URL), {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.Promise = global.Promise;

module.exports = mongoose;
