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
 * @api {get} /api/user Get all users
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} users List of users
 * @apiSuccess {Number} users.user_id User ID
 * @apiSuccess {String} users.username Username
 * @apiSuccess {String} users.email Email
 * @apiSuccess {Number} users.user_level_id User level ID
 */
userRouter.get('/', getAllUsers);

/**
 * @api {post} /api/user Create a new user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiBody {String} username Username (3-100 chars, alphanumeric)
 * @apiBody {String} email Valid email
 * @apiBody {String} password Password (min 8 chars)
 *
 * @apiSuccess {Number} user_id Created user ID
 * @apiSuccess {String} message Success message
 */
userRouter.post('/', validateNewUser, postNewUser);

/**
 * @api {get} /api/user/:id Get user by ID
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User unique ID
 *
 * @apiSuccess {Number} user_id User ID
 * @apiSuccess {String} username Username
 * @apiSuccess {String} email Email
 * @apiSuccess {Number} user_level_id User level ID
 */
userRouter.get('/:id', validateUserId, getUserById);

/**
 * @api {put} /api/user/:id Update user by ID
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User unique ID
 * @apiBody {String} [username] New username
 * @apiBody {String} [email] New email
 * @apiBody {String} [password] New password
 *
 * @apiSuccess {Object} item Updated user object
 * @apiSuccess {String} message Success message
 */
userRouter.put('/:id', validateUserId, updateUserById);

/**
 * @api {delete} /api/user/:id Delete user by ID
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User unique ID
 *
 * @apiSuccess {String} message Success message
 */
userRouter.delete('/:id', validateUserId, deleteUserById);

export default userRouter;
