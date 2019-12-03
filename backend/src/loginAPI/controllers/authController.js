/* eslint-disable new-cap */
const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Project = require("../models/project");

const router = express.Router();

router.post("/register", async (req, res) => {
  const {email} = req.body.email;
  const {token} = req.body.projectToken;
  
  try {
    if (await User.findOne({email})) {
      return res.status(400).send({message: "User alredy exists"});
    }
    const project = await Project.findOne({token: token})
    console.log("Project", project)
    if (!project) {
      return res.status(400).send({message: "Token not found"});
    }

    const user = await User.create(req.body);

    console.log(user);
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      project: user.project,
      createdAt: user.createdAt,
    });
  } catch (err) {
    return res.status(400).send({message: "Registration failed"});
  }
});

router.post("/authenticate", async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email}).select("+password");

  if (!user) {
    return res.status(400).send({message: "User not found"});
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({message: "Invalid password"});
  }

  user.password = undefined;
  console.log(user.projectToken)
  const project = await Project.findOne({token: user.projectToken})
  
  console.log(project)
  res.send({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
});

module.exports = router;
