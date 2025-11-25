import jwt from 'jsonwebtoken';
import {addUser, selectUserByUsername} from '../models/user-model.js';
import 'dotenv/config';
import {validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await selectUserByUsername(req.body.username);
  const passwordMatch =
    user && (await bcrypt.compare(req.body.password, user.password));
  if (passwordMatch) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({...user, token});
  } else {
    res.sendStatus(401);
  }
};

const postUser = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors.array());
  // }
  const newUser = req.body;
  // default user level
  newUser.user_level_id = 1;
  // replace plain text password with hashed password
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const result = await addUser(newUser);
  if (result.user_id) {
    res.json({message: 'User created', user_id: result.user_id});
  } else {
    const error = new Error(result.error);
    error.status = 400;
    next(error);
  }
};

const getMe = async (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  }
};

export {postLogin, postUser, getMe};
