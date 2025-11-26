import express from 'express';
import {
  getMediaLikes,
  getUserLikes,
  postLike,
  deleteLikeById,
} from '../controllers/like-controller.js';

const likeRouter = express.Router();

// Media likes
likeRouter.get('/media/:id', getMediaLikes);

// User likes
likeRouter.get('/user/:id', getUserLikes);

// Add like
likeRouter.post('/', postLike);

// Delete like
likeRouter.delete('/:id', deleteLikeById);

export default likeRouter;
