import express from 'express';
import {
  getAllMedia,
  getMediaById,
  getMediaByUser,
  postNewMedia,
  updateMediaById,
  deleteMediaById,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import upload from '../../middlewares/upload.js';
import {body} from 'express-validator';

// ALL media endpoints handled with express router
const mediaRouter = express.Router();

// Get all media and post new media
mediaRouter
  .route('/')
  // Get all media items
  .get(getAllMedia)
  // Post new media item
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').isLength({min: 3, max: 100}),
    // TODO: add required validation rules for other fields
    postNewMedia,
  );

mediaRouter.route('/user').get(authenticateToken, getMediaByUser);

// Delete, get and update media by id
mediaRouter
  .route('/:id')
  // Get media item by id
  .get(getMediaById)
  // Update media item
  .put(updateMediaById)
  // Delete media item
  .delete(deleteMediaById);

export default mediaRouter;
