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
 * @api {get} /api/likes/media/:id Get likes for a media item
 * @apiName GetMediaLikes
 * @apiGroup Likes
 *
 * @apiParam {Number} id Media unique ID
 *
 * @apiSuccess {Object[]} likes Array of likes for the media
 * @apiSuccess {Number} likes.user_id User ID who liked
 * @apiSuccess {Number} likes.media_id Media ID
 */
likeRouter.get(
  '/media/:id',
  param('id').isInt().withMessage('media_id must be an integer'),
  validationErrors,
  getMediaLikes,
);

/**
 * @api {get} /api/likes/user/:id Get likes by a user
 * @apiName GetUserLikes
 * @apiGroup Likes
 *
 * @apiParam {Number} id User unique ID
 *
 * @apiSuccess {Object[]} likes Array of likes by the user
 * @apiSuccess {Number} likes.user_id User ID
 * @apiSuccess {Number} likes.media_id Media ID liked
 */
likeRouter.get(
  '/user/:id',
  param('id').isInt().withMessage('user_id must be an integer'),
  validationErrors,
  getUserLikes,
);

/**
 * @api {post} /api/likes Add a new like
 * @apiName PostLike
 * @apiGroup Likes
 *
 * @apiBody {Number} user_id User ID
 * @apiBody {Number} media_id Media ID
 *
 * @apiSuccess {Object} item Created like object
 * @apiSuccess {String} message Success message
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
 * @api {delete} /api/likes/:id Delete a like
 * @apiName DeleteLike
 * @apiGroup Likes
 *
 * @apiParam {Number} id Like unique ID
 *
 * @apiSuccess {String} message Success message
 */
likeRouter.delete(
  '/:id',
  param('id').isInt().withMessage('like_id must be an integer'),
  validationErrors,
  deleteLikeById,
);

export default likeRouter;
