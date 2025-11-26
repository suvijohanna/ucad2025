import express from 'express';
import multer from 'multer';
import {
  getAllMedia,
  getMediaById,
  getMediaByUser,
  postNewMedia,
  updateMediaById,
  deleteMediaById,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

// ALL media endpoints handled with express router
const mediaRouter = express.Router();
const upload = multer({dest: process.env.UPLOADS_PATH});

// Get all media and post new media
mediaRouter
  .route('/')
  // Get all media items
  .get(getAllMedia)
  // Post new media item
  .post(authenticateToken, upload.single('file'), postNewMedia);

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
