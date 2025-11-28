import {
  getLikesByMediaId,
  getLikesByUserId,
  addLike,
  deleteLike,
} from '../models/like-model.js';

/**
 * Get all likes for a specific media item.
 *
 * @param {Object} req - HTTP request, expects `req.params.id` as media_id
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON array of likes or 500 on database error
 */
const getMediaLikes = async (req, res) => {
  try {
    const likes = await getLikesByMediaId(req.params.id);
    res.json(likes);
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Get all likes by a specific user.
 *
 * @param {Object} req - HTTP request, expects `req.params.id` as user_id
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON array of likes or 500 on database error
 */
const getUserLikes = async (req, res) => {
  try {
    const likes = await getLikesByUserId(req.params.id);
    res.json(likes);
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Add a new like for a media item by a user.
 *
 * @param {Object} req - HTTP request, expects `req.body.user_id` and `req.body.media_id`
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON with the created like or 400 if missing data, 500 on error
 */
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

/**
 * Delete a like by its ID.
 *
 * @param {Object} req - HTTP request, expects `req.params.id` as like_id
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON confirmation or 404 if not found, 500 on database error
 */
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
