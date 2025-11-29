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
import {body} from 'express-validator';
import {validationErrors} from '../middlewares/error-handlers.js';

// ALL media endpoints handled with express router
const mediaRouter = express.Router();

mediaRouter
  .route('/')
  // Get all media items
  .get(getAllMedia)
  // Post new media item
  .post(
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

// Get logged in user's media items
mediaRouter.route('/user').get(authenticateToken, getMediaByUser);

mediaRouter
  .route('/:id')
  // Get media item by id
  .get(getMediaById)
  // Update media item
  .put(
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
  )
  // Delete media item
  .delete(authenticateToken, deleteMediaById);

export default mediaRouter;
