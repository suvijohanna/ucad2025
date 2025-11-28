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

/**
 * Handle user login.
 * Verifies username and password, returns JWT token if valid.
 *
 * @param {Object} req - HTTP request, expects {username, password} in body
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON response with user info and token or 401
 */
const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await selectUserByUsername(req.body.username);
  const passwordMatch = user && user.password === req.body.password;
  if (!passwordMatch) {
    return res.sendStatus(401);
  }
  // Do not include password in response
  delete user.password;
  // Create JWT token
  const payload = {
    user_id: user.user_id,
    username: user.username,
    user_level_id: user.user_level_id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.json({...payload, token});
};

/**
 * Returns the currently authenticated user.
 *
 * @param {Object} req - HTTP request, expects JWT middleware to set req.user
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON response with user info if token is valid
 */
const getMe = async (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  }
};

/**
 * Return all user items from database
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON array of all users
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
 * @param {Object} req - HTTP request, expects req.params.id
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON object of the user or 404 if not found
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
 * @param {Object} req - HTTP request, expects user data in req.body
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON with created user_id or 400 on error
 */
const postNewUser = async (req, res) => {
  const newUser = req.body;
  // regular user level by default
  newUser.user_level_id = 1;
  const result = await addUser(newUser);
  if (result.user_id) {
    return res.json({message: 'User created.', user_id: result.user_id});
  } else {
    return res.status(400).json({});
  }
};

/**
 * Modifies user item in the database based on value on user_id
 * Includes authorization: regular users can update only their own info
 *
 * @param {Object} req - HTTP request, expects req.params.id and req.body
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON with updated item or 403/404 if unauthorized/not found
 */
const updateUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const isAdmin = req.user.user_level_id === 2;
    if (!isAdmin && userId !== req.user.user_id) {
      return res
        .status(403)
        .json({message: 'Forbidden: cannot edit other users'});
    }
    const updatedUser = await updateUser(userId, req.body);
    if (!updatedUser) return res.status(404).json({message: 'User not found'});
    res.json({message: 'User updated', item: updatedUser});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Deletes user item from the database based on value on user_id
 * Includes authorization: only allows self-deletion
 *
 * @param {Object} req - HTTP request, expects req.params.id
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON message of deletion or 403/404 if unauthorized/not found
 */
const deleteUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    // Only allow user to delete their own account
    if (userId !== req.user.user_id) {
      return res
        .status(403)
        .json({message: 'Forbidden: cannot delete other users'});
    }
    const success = await deleteUser(userId);
    if (!success) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json({message: 'User deleted'});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

export {
  getAllUsers,
  postLogin,
  getMe,
  getUserById,
  postNewUser,
  updateUserById,
  deleteUserById,
};
