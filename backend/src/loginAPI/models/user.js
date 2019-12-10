const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  projectId: String,
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  salt: String,
  hash: String,
  admin: {type: Boolean, default: false},
  manager: {type: Boolean, default: false},
  projectToken: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
