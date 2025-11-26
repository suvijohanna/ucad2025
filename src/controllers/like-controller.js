import {
  getLikesByMediaId,
  getLikesByUserId,
  addLike,
  deleteLike,
} from '../models/like-model.js';

// GET /api/likes/media/:id
const getMediaLikes = async (req, res) => {
  try {
    const likes = await getLikesByMediaId(req.params.id);
    res.json(likes);
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

// GET /api/likes/user/:id
const getUserLikes = async (req, res) => {
  try {
    const likes = await getLikesByUserId(req.params.id);
    res.json(likes);
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

// POST /api/likes
const postLike = async (req, res) => {
  try {
    const {user_id, media_id} = req.body;
    if (!user_id || !media_id) {
      return res.status(400).json({message: 'user_id and media_id required'});
    }
    const newLike = await addLike({user_id, media_id});
    res.status(201).json({message: 'Like added', item: newLike});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

// DELETE /api/likes/:id
const deleteLikeById = async (req, res) => {
  try {
    const success = await deleteLike(req.params.id);
    if (!success) {
      return res.status(404).json({message: 'Like not found'});
    }
    res.json({message: 'Like deleted'});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

export {getMediaLikes, getUserLikes, postLike, deleteLikeById};
