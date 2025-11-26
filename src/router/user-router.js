import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postNewUser,
  updateUserById,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Users endpoints

userRouter
  .route('/')
  // Get all users
  .get(getAllUsers)
  // Create new user
  .post(postNewUser);

userRouter
  .route('/:id')
  // Get user by ID
  .get(getUserById)
  // Update user by user ID
  .put(updateUserById)
  // Delete user by user ID
  .delete(deleteUserById);

export default userRouter;
