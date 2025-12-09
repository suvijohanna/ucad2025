import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrors} from '../middlewares/error-handlers.js';

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": {
 *         "message": "Invalid username or password",
 *         "status": 401
 *       }
 *     }
 */

/**
 * @api {post} /auth/login Login
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiBody {String} username Username of the user
 * @apiBody {String} password Password of the user
 *
 * @apiSuccess {String} token Token for the user authentication
 * @apiSuccess {Number} user_id User ID
 * @apiSuccess {String} username Username
 * @apiSuccess {String} email Email
 * @apiSuccess {Number} user_level_id User level ID
 *
 * @apiUse UnauthorizedError
 */
authRouter.post(
  '/login',
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  validationErrors,
  postLogin,
);

/**
 * @api {get} /auth/me Request information about current user
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {Object} user User info
 * @apiSuccess {Number} user.user_id Id of the User
 * @apiSuccess {String} user.username Username
 * @apiSuccess {String} user.email Email of the User
 * @apiSuccess {Number} user.user_level_id User level id of the User
 * @apiSuccess {Number} user.iat Token creation timestamp
 *
 * @apiError InvalidToken Authentication token was invalid
 */
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
