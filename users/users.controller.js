const Joi = require('joi');
const userModel = require('./users.model');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const {
  Types: { ObjectId },
} = require('mongoose');

class UserController {
  constructor() {
    this._costFactor = 4;
  }
  get registerUser() {
    return this._registerUser.bind(this);
  }
  get login() {
    return this._login.bind(this);
  }
  get getCurrentUser() {
    return this._getCurrentUser.bind(this);
  }
  validateUserInfo(req, res, next) {
    const infoRules = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validationResult = infoRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  }
  async _registerUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const passwordHash = await bcryptjs.hash(password, this._costFactor);

      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).send('Email in use');
      }
      const user = await userModel.create({
        email,
        password: passwordHash,
      });

      return res.status(201).json({
        user: {
          id: user._id,
          email: user.email,
          subscription: user.subscription.default,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async _login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(401).send('Email or password is wrong');
      }
      const isPasswordValid = bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send('Email or password is wrong');
      }
      const token = jwt.sign({ id: user._id }, config.jwt_secret, {
        expiresIn: 2 * 24 * 60 * 60,
      });
      await userModel.updateToken(user._id, token);
      res.status(200).json({
        token: user.token,
        user: { email: user.email, subscription: user.subscription.default },
      });
    } catch (error) {
      next(error);
    }
  }
  async authorize(req, res, next) {
    try {
      const authorizationHeader = req.get('Authorization');
      const token = authorizationHeader.replace('Bearer ', '');
      let userId;
      try {
        userId = await jwt.verify(token, config.jwt_secret).id;
      } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
        next(error);
      }

      const user = await userModel.findById(userId);
      if (!user || user.token !== token) {
        res.status(401).json({ message: 'Not authorized' });
      }

      req.user = user;
      req.token = token;

      next();
    } catch (err) {
      next(err);
    }
  }
  async logout(req, res, next) {
    try {
      const user = req.user;
      await userModel.updateToken(user._id, null);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async getCurrentUser(req, res, next) {
    const { email, subscription } = req.user;
    return res.status(200).json({
      email: email,
      subscription: subscription.default,
    });
  }
}
module.exports = new UserController();
