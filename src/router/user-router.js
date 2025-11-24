import express from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postNewUser,
  updateUserById,
} from '../users.js';
import {postUser} from '../controllers/user-controller.js';
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

// Get all users
userRouter.route('/').get(getAllUsers).post(postNewUser);
// Get user by id
userRouter
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export default userRouter;
