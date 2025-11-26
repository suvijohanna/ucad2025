import express from 'express';
import multer from 'multer';
import {
  deleteMediaById,
  getAllMedia,
  postNewMedia,
  getMediaById,
  updateMediaById,
} from '../controllers/media-controller.js';

// ALL media endpoints handled with express router
const mediaRouter = express.Router();
const upload = multer({dest: process.env.UPLOADS_PATH});

mediaRouter
  .route('/')
  // Get all media items
  .get(getAllMedia)
  // Add new media item
  .post(upload.single('file'), postNewMedia);

mediaRouter
  .route('/:id')
  // Get media item by id
  .get(getMediaById)
  // Update media item
  .put(updateMediaById)
  // Delete media item
  .delete(deleteMediaById);

export default mediaRouter;
