const bodyParser = require("body-parser");
const express = require("express");
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();

var port = process.env.PORT || 3001;




app.use(function(req, res, next) {
    // Website you wish to allow to connect.
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  
    // Request methods you wish to allow.
    res.setHeader("Access-Control-Allow-Methods", "POST");
  
    // Request headers you wish to allow.
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  
    next();
  });


app.get('/projects', function(req, res, next) {
    var name = req.body.project;
    var contactPoint = req.body.contact;
    var interactions = req.body.quiz;

    
});



app.listen(port, function() {
	console.log("App running");
});