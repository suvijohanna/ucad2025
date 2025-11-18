import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postNewUser,
  updateUserById,
} from '../users.js';
import {postUser} from '../controllers/user-controller.js';

const userRouter = express.Router();
userRouter.route('/login').post(postUser);

// Users endpoints

// Get all users
userRouter.route('/').get(getAllUsers).post(postNewUser);
// Get user by id
userRouter
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default userRouter;
