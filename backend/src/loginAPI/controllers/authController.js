/* eslint-disable new-cap */
const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const {email} = req.body;

  try {
    if (await User.findOne({email})) {
      return res.status(400).send({error: "User alredy exists"});
    }

    const user = await User.create(req.body);

    console.log(user);
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    return res.status(400).send({error: "Registration failed"});
  }
});

router.post("/authenticate", async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email}).select("+password");

  if (!user) {
    return res.status(400).send({error: "User not found"});
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({error: "Invalid password"});
  }

  user.password = undefined;

  res.send({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
});

module.exports = router;
