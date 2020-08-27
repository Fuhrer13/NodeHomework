const express = require('express');
const usersRouter = express.Router();
const UserController = require('./users.controller');

usersRouter.get(
  '/current',
  UserController.authorize,
  UserController.getCurrentUser,
);
usersRouter.post(
  '/register',
  UserController.validateUserInfo,
  UserController.registerUser,
);
usersRouter.post(
  '/login',
  UserController.validateUserInfo,
  UserController.login,
);
usersRouter.post('/logout', UserController.authorize, UserController.logout);

module.exports = usersRouter;
