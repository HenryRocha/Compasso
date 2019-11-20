var express = require('express');
var router = express.Router();
const Quiz = require('../models/quiz');


router.post('/quiz', function (req, res, next) {
  var { name, description, questions, companies } = req.body;
  companies = companies.split(",");
  console.log(companies)
  const quiz = { name, description, questions, companies }
  Quiz.create(quiz, function (error) {
    if (error) {
      res.status(400).json({text: error.message});
    } else {
      res.status(200).json({text: "Sucess!"});
    }
  });
});

router.get('/quiz/:id', function(req, res, next) {
  const {id} = req.params
  Quiz.findById(id).exec(function (error, quiz) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({quiz});
    }
  });
});

router.put('/quiz/:id', function(req, res, next) {
  const {id} = req.params
  const { name, description, questions } = req.body
  const quiz = { name, description, questions }
  Quiz.findByIdAndUpdate(id, { $set: quiz }).exec(function (error) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({text: "Sucess!"});
    }
  });
});

router.delete('/quiz/:id', function(req, res, next) {
  const {id} = req.params
  Quiz.findByIdAndRemove(id).exec(function (error) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({text: "Sucess!"});
    }
  });
});

router.get('/quizes', function(req, res, next) {
  Quiz.find().exec(function (error, quizes) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({quizes});
    }
  });
});

router.get('/quizes/:company', function(req, res, next) {
  const { company } = req.params
  Quiz.find({ companies: { "$regex": company, "$options": "i" } }).exec(function (error, quizes) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({quizes});
    }
  });
});

module.exports = router;
