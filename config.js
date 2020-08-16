require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
};
