// MODULES
require("dotenv").config();


// EXPORTS
module.exports = {
  PORT: process.env.PORT || 8084,
  DBURL: process.env.DBURL || "mongodb://localhost/noderest",
};
