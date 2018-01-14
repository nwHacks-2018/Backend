import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';

import User from '../models/user.model.js';

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity

  User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {

    if (req.body.email === user.email && req.body.password === user.password) {

      const token = jwt.sign({
        data: user
      }, config.jwtSecret);
      return res.json({
        token,
        email: user.email
      });

    }

  });

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function signup(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity

  User.create({ name: req.body.name, email: req.body.email, age: req.body.age, password: req.body.password, sexualPreference: req.body.sexualPreference, gender: req.body.gender }, function (err, user) {

    const token = jwt.sign({
      data: user
    }, config.jwtSecret);
    return res.json({
      token,
      user: user
    });

    if (err) return new APIError('Authentication error' + err, httpStatus.UNAUTHORIZED, true);
    // saved!

  });

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, signup,  getRandomNumber };
