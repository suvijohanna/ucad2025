import express from 'express';
import {body, param} from 'express-validator';
import {
  getMediaLikes,
  getUserLikes,
  postLike,
  deleteLikeById,
} from '../controllers/like-controller.js';
import {validationErrors} from '../middlewares/error-handlers.js';

const likeRouter = express.Router();

/**
 * Get likes for a media item
 * GET /api/likes/media/:id
 */
likeRouter.get(
  '/media/:id',
  param('id').isInt().withMessage('media_id must be an integer'),
  validationErrors,
  getMediaLikes,
);

/**
 * Get likes by a user
 * GET /api/likes/user/:id
 */
likeRouter.get(
  '/user/:id',
  param('id').isInt().withMessage('user_id must be an integer'),
  validationErrors,
  getUserLikes,
);

/**
 * Add a like
 * POST /api/likes
 */
likeRouter.post(
  '/',
  [
    body('user_id').isInt().withMessage('user_id must be an integer'),
    body('media_id').isInt().withMessage('media_id must be an integer'),
  ],
  validationErrors,
  postLike,
);

/**
 * Delete a like
 * DELETE /api/likes/:id
 */
likeRouter.delete(
  '/:id',
  param('id').isInt().withMessage('like_id must be an integer'),
  validationErrors,
  deleteLikeById,
);

export default likeRouter;
