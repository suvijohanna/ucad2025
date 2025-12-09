import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
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
 * Looks up user by username, verifies password using bcrypt,
 * and returns a signed JWT token if authentication succeeds.
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.username - Username attempting to log in
 * @param {string} req.body.password - Plaintext password for authentication
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function for error handling
 * @returns {void} Sends JSON containing user info and JWT token, or 401 if credentials are invalid
 */
const postLogin = async (req, res, next) => {
  try {
    const user = await selectUserByUsername(req.body.username);
    const passwordMatch =
      user && (await bcrypt.compare(req.body.password, user.password));
    if (!passwordMatch) {
      const error = new Error('Invalid username or password');
      error.status = 401;
      throw error;
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
  } catch (err) {
    next(err);
  }
};

/**
 * Returns the currently authenticated user.
 *
 * @param {Object} req - HTTP request, expects JWT middleware to set req.user
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function for error handling
 * @returns {void} Sends JSON response with user info if token is valid
 */
const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error('No authenticated user');
      error.status = 401;
      throw error;
    }
    res.json({message: 'token ok', user: req.user});
  } catch (err) {
    next(err);
  }
};

/**
 * Return all user items from database
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function for error handling
 * @returns {void} Sends JSON array of all users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * Return user item from the database based on value on user_id
 *
 * @param {Object} req - HTTP request, expects req.params.id
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function for error handling
 * @returns {void} Sends JSON object of the user or 404 if not found
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Creates a new user in the database.
 *
 * - Validates input using express-validator
 * - Hashes the user's password using bcrypt before storing
 * - Assigns default user_level_id = 1
 *
 * @param {Object} req - HTTP request, expects {username, password, email} in body
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function for error handling
 * @returns {void} Sends JSON containing created user_id, or forwards error
 */
const postNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        errors
          .array()
          .map((e) => `${e.path}: ${e.msg}`)
          .join(', '),
      );
      error.status = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {...req.body, password: hashedPassword, user_level_id: 1};
    const result = await addUser(newUser);
    if (!result || typeof result !== 'number') {
      const error = new Error('User creation failed');
      error.status = 400;
      throw error;
    }
    res.status(201).json({message: 'User created', user_id: result});
  } catch (err) {
    next(err);
  }
};

/**
 * Modifies user item in the database based on value on user_id
 * Includes authorization: regular users can update only their own info
 *
 * @param {Object} req - HTTP request, expects req.params.id and req.body
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function for error handling
 * @returns {void} Sends JSON with updated item or 403/404 if unauthorized/not found
 */
const updateUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const isAdmin = req.user.user_level_id === 2;
    if (!isAdmin && userId !== req.user.user_id) {
      const error = new Error('Forbidden: cannot edit other users');
      error.status = 403;
      throw error;
    }
    const updatedUser = await updateUser(userId, req.body);
    if (!updatedUser) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    res.json({message: 'User updated', item: updatedUser});
  } catch (err) {
    next(err);
  }
};

/**
 * Deletes user item from the database based on value on user_id
 * Includes authorization: only allows self-deletion
 *
 * @param {Object} req - HTTP request, expects req.params.id
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function for error handling
 * @returns {void} Sends JSON message of deletion or 403/404 if unauthorized/not found
 */
const deleteUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.user_id) {
      const error = new Error('Forbidden: cannot delete other users');
      error.status = 403;
      throw error;
    }
    const success = await deleteUser(userId);
    if (!success) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    res.json({message: 'User deleted'});
  } catch (err) {
    next(err);
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
