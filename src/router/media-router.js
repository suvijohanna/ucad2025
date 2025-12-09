import express from 'express';
import {
  getAllMedia,
  getMediaById,
  getMediaByUser,
  postNewMedia,
  updateMediaById,
  deleteMediaById,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import upload from '../middlewares/upload.js';
import {body, param} from 'express-validator';
import {validationErrors} from '../middlewares/error-handlers.js';

const mediaRouter = express.Router();

/**
 * @api {get} /api/media Get all media items
 * @apiName GetAllMedia
 * @apiGroup Media
 *
 * @apiSuccess {Object[]} media Array of media items
 * @apiSuccess {Number} media.media_id Media ID
 * @apiSuccess {String} media.title Media title
 * @apiSuccess {String} media.description Media description
 * @apiSuccess {Number} media.user_id Owner user ID
 */
mediaRouter.get('/', getAllMedia);

/**
 * @api {post} /api/media Create new media
 * @apiName CreateMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token (JWT)
 *
 * @apiBody {File} file Media file to upload
 * @apiBody {String} [title] Optional title (3-100 characters)
 * @apiBody {String} [description] Optional description (max 500 characters)
 *
 * @apiSuccess {Number} media_id Created media ID
 * @apiSuccess {String} message Success message
 */
mediaRouter.post(
  '/',
  authenticateToken,
  upload.single('file'),
  body('title')
    .optional()
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage('Title must be 3–100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({max: 500})
    .withMessage('Description max length 500'),
  validationErrors,
  postNewMedia,
);

/**
 * @api {get} /api/media/user Get current user's media
 * @apiName GetUserMedia
 * @apiGroup Media
 */
mediaRouter.get('/user', authenticateToken, getMediaByUser);

/**
 * @api {get} /api/media/:id Get media item by ID
 * @apiName GetMediaById
 * @apiGroup Media
 *
 * @apiParam {Number} id Media unique ID
 *
 * @apiSuccess {Object} media Media object
 * @apiSuccess {Number} media.media_id
 * @apiSuccess {String} media.title
 * @apiSuccess {String} media.description
 * @apiSuccess {Number} media.user_id
 */
mediaRouter.get(
  '/:id',
  param('id').isInt().withMessage('Media ID must be an integer'),
  validationErrors,
  getMediaById,
);

/**
 * @api {put} /api/media/:id Update existing media item
 * @apiName UpdateMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token (JWT)
 *
 * @apiParam {Number} id Media unique ID
 * @apiBody {String} [title] Optional title (3-100 characters)
 * @apiBody {String} [description] Optional description (max 500 characters)
 *
 * @apiSuccess {Object} item Updated media object
 * @apiSuccess {String} message Success message
 */
mediaRouter.put(
  '/:id',
  authenticateToken,
  body('title')
    .optional()
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage('Title must be 3–100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({max: 500})
    .withMessage('Description max length 500'),
  validationErrors,
  updateMediaById,
);

/**
 * @api {delete} /api/media/:id Delete a media item
 * @apiName DeleteMedia
 * @apiGroup Media
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id Media unique ID
 *
 * @apiSuccess {String} message Success message
 */
mediaRouter.delete(
  '/:id',
  authenticateToken,
  param('id').isInt().withMessage('Media ID must be an integer'),
  validationErrors,
  deleteMediaById,
);

export default mediaRouter;
