import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {
  findAllUsers,
  findUserById,
  addUser,
  selectUserByUsername,
  updateUser,
  deleteUser,
} from '../models/user-model.js';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await selectUserByUsername(req.body.username);
  const passwordMatch = user && user.password === req.body.password;
  if (passwordMatch) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({...user, token});
  } else {
    res.sendStatus(401);
  }
};

const postUser = async (req, res) => {
  const newUser = req.body;
  newUser.user_level_id = 1; // default user level
  const result = await addUser(newUser);
  if (result.user_id) {
    res.json({message: 'User created', user_id: result.user_id});
  } else {
    return res.status(400).res.json({});
  }
};

const getMe = async (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  }
};

export {postLogin, postUser, getMe};
import {
  findAllUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser,
} from '../models/user-model.js';

/**
 * Return all user items from database
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Return user item from the database based on value on user_id
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
 */
const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Adds a new user item to the database
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const postNewUser = async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json({message: 'New user created', item: newUser});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Modifies user item in the database based on value on user_id
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json({message: 'User updated', item: updatedUser});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Deletes user item from the database based on value on user_id
 *
 * @param {Object} req HTTP request
 */
const deleteUserById = async (req, res) => {
  try {
    const success = await deleteUser(req.params.id);
    if (!success) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json({message: 'User deleted'});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

export {getAllUsers, getUserById, postNewUser, updateUserById, deleteUserById};
