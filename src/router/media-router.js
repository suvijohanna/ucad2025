import express from 'express';
import multer from 'multer';
import {
  deleteMediaById,
  postMedia,
  getMediaById,
  updateMediaById,
  getMedia,
  getMediaByUser,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

// ALL media endpoints handled with express router
const mediaRouter = express.Router();
const upload = multer({dest: process.env.UPLOADS_PATH});

// Get all media and post new media
mediaRouter
  .route('/')
  .get(getMedia)
  .post(authenticateToken, upload.single('file'), postMedia);

// Get media by user (logged in)
mediaRouter.route('/user').get(authenticateToken, getMediaByUser);

// Delete, get and update media by id
mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(updateMediaById)
  .delete(deleteMediaById);

export default mediaRouter;
