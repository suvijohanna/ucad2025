import express from 'express';
import {body, param} from 'express-validator';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postNewUser,
  updateUserById,
} from '../controllers/user-controller.js';
import {validationErrors} from '../middlewares/error-handlers.js';

const userRouter = express.Router();

/**
 * Validation rules for new users
 */
const validateNewUser = [
  body('username')
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage('Username must be 3–100 characters')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),

  body('password')
    .trim()
    .isLength({min: 8, max: 100})
    .withMessage('Password must be at least 8 characters'),

  body('email').trim().isEmail().withMessage('Invalid email address'),

  validationErrors,
];

/**
 * Validation rules for user ID
 */
const validateUserId = [
  param('id').isInt().withMessage('User ID must be an integer'),
  validationErrors,
];

/**
 * /api/user
 */
userRouter.route('/').get(getAllUsers).post(validateNewUser, postNewUser);

/**
 * /api/user/:id
 */
userRouter
  .route('/:id')
  .get(validateUserId, getUserById)
  .put(validateUserId, updateUserById)
  .delete(validateUserId, deleteUserById);

export default userRouter;
