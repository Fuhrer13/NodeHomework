require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  jwt_secret: process.env.JWT_SECRET_KEY,
};
