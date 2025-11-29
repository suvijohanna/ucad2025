import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrors} from '../middlewares/error-handlers.js';

const authRouter = express.Router();

// Validation for login
const validateLogin = [
  body('username').trim().notEmpty().withMessage('Username is required'),

  body('password').trim().notEmpty().withMessage('Password is required'),

  validationErrors,
];

authRouter.post('/login', validateLogin, postLogin);
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
