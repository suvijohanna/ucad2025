import express from 'express';
import {
  deleteMediaById,
  getAllMedia,
  postNewMedia,
  getMediaById,
  updateMediaById,
} from '../controllers/media-controller.js';

// ALL media endpoints handled with express router
const mediaRouter = express.Router();

// Get all media and post new media
mediaRouter.route('/').get(getAllMedia).post(postNewMedia);
// Delete, get and update media by id
mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(updateMediaById)
  .delete(deleteMediaById);

export default mediaRouter;
