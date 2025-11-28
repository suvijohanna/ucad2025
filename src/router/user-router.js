import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postNewUser,
  updateUserById,
} from '../controllers/user-controller.js';
import {body} from 'express-validator';

const userRouter = express.Router();
userRouter
  .route('/')
  .post(
    body('username').trim().isLength({min: 3, max: 100}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 100}),
    body('email').trim().isEmail(),
    postUser,
  );

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
