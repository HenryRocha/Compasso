// MODULES
require("dotenv").config();


// EXPORTS
module.exports = {
  PORT: process.env.PORT || 8081,
  DBURL: process.env.DBURL || "mongodb://localhost/noderest",
};
