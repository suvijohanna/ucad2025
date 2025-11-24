import express from 'express';
import {
  deleteMediaById,
  postMedia,
  getMediaById,
  updateMediaById,
  getMedia,
  getMediaByUser,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import upload from '../../middlewares/upload.js';
import {body} from 'express-validator';

// ALL media endpoints handled with express router
const mediaRouter = express.Router();

// Get all media and post new media
mediaRouter
  .route('/')
  .get(getMedia)
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').isLength({min: 3, max: 100}),
    // TODO: add required validation rules for other fields
    postMedia,
  );

// Get media by user (logged in)
mediaRouter.route('/user').get(authenticateToken, getMediaByUser);

// Delete, get and update media by id
mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(updateMediaById)
  .delete(deleteMediaById);

export default mediaRouter;
