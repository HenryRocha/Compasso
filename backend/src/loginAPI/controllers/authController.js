const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth");

const User = require("../models/user");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};

router.post("/register", async (req, res) => {
  const {email} = req.body;

  try {
    if (await User.findOne({email})) {
      return res.status(400).send({error: "User alredy exists"});
    }

    const user = await User.create(req.body);
    user.id = user._id;
    delete user._id;
    delete user.password;

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
    user,
    // token: generateToken({ id: user.id }),
  });
});

module.exports = router;
