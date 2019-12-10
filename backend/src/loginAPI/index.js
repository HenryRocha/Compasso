const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Configure where we can receive requests from and which methods and headers we allow.
app.use(function(req, res, next) {
  // Website you wish to allow to connect.
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow.
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  // Request headers you wish to allow.
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");

  next();
});

app.use("/auth", require("./controllers/authController"));

app.listen(5002);
