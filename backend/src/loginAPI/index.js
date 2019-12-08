const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/auth", require("./controllers/authController"));

app.listen(port, function() {
    console.log("loginAPI listening on port " + port);
});
