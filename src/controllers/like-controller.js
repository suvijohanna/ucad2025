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
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON array of likes or forwards error
 */
const getMediaLikes = async (req, res, next) => {
  try {
    const likes = await getLikesByMediaId(req.params.id);
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all likes by a specific user.
 *
 * @param {Object} req - HTTP request, expects `req.params.id` as user_id
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON array of likes or forwards error
 */
const getUserLikes = async (req, res, next) => {
  try {
    const likes = await getLikesByUserId(req.params.id);
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new like for a media item by a user.
 *
 * @param {Object} req - HTTP request, expects `req.body.user_id` and `req.body.media_id`
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON with the created like or forwards validation/database errors
 */
const postLike = async (req, res, next) => {
  try {
    const {user_id, media_id} = req.body;
    if (!user_id || !media_id) {
      const error = new Error('user_id and media_id required');
      error.status = 400;
      return next(error);
    }
    const newLike = await addLike({user_id, media_id});
    res.status(201).json({message: 'Like added', item: newLike});
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a like by its ID.
 *
 * @param {Object} req - HTTP request, expects `req.params.id` as like_id
 * @param {Object} res - HTTP response
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON confirmation or forwards 404/database errors
 */
const deleteLikeById = async (req, res, next) => {
  try {
    const success = await deleteLike(req.params.id);
    if (!success) {
      const error = new Error('Like not found');
      error.status = 404;
      return next(error);
    }
    res.json({message: 'Like deleted'});
  } catch (error) {
    next(error);
  }
};

export {getMediaLikes, getUserLikes, postLike, deleteLikeById};
