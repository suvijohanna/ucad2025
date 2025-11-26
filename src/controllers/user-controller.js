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
 * Adds a new user item to the mock data
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
