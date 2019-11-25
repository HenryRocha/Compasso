var express = require('express');
var router = express.Router();
const Template = require('../models/template');


router.post('/template', function (req, res, next) {
  var { title, description, questions, companies } = req.body;
  const template = { title, description, questions, companies }
  Template.create(template, function (error) {
    if (error) {
      res.status(400).json({text: error.message});
    } else {
      res.status(200).json({text: "Sucess!"});
    }
  });
});

router.get('/template/:id', function(req, res, next) {
  const {id} = req.params
  Template.findById(id).exec(function (error, template) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({template});
    }
  });
});

router.put('/template/:id', function(req, res, next) {
  const {id} = req.params
  var { title, description, questions, companies } = req.body;
  const template = { title, description, questions, companies }
  Template.findByIdAndUpdate(id, { $set: template }).exec(function (error) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({text: "Sucess!"});
    }
  });
});

router.delete('/template/:id', function(req, res, next) {
  const {id} = req.params
  Template.findByIdAndRemove(id).exec(function (error) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({text: "Sucess!"});
    }
  });
});

router.get('/templates', function(req, res, next) {
  Template.find().exec(function (error, templates) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({templates});
    }
  });
});

router.get('/templates/:company', function(req, res, next) {
  const { company } = req.params
  Template.find({ companies: { "$regex": company, "$options": "i" } }).exec(function (error, templates) {
    if (error) {
      res.status(400).json({text: error.message});
    }else{
      res.status(200).json({templates});
    }
  });
});

module.exports = router;