import {validationResult} from 'express-validator';
import {
  listAllMedia,
  findMediaById,
  findMediaByUserId,
  addMedia,
  updateMedia,
  deleteMedia,
} from '../models/media-model.js';

/**
 * Return all media items from the database.
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void} Sends JSON array of all media items or 500 on error.
 */
const getAllMedia = async (req, res) => {
  try {
    const media = await listAllMedia();
    res.json(media);
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Return a single media item based on its ID.
 *
 * @param {Object} req - HTTP request object, expects `req.params.id`.
 * @param {Object} res - HTTP response object.
 * @returns {void} Sends JSON object of the media item or 404 if not found.
 */
const getMediaById = async (req, res) => {
  try {
    const media = await findMediaById(req.params.id);
    if (!media) return res.status(404).json({message: 'Media item not found'});

    media.filepath = `${req.protocol}://${req.headers.host}/${process.env.UPLOADS_PATH}/${media.filename}`;
const getMediaById = async (req, res, next) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    // add full filepath to media item
    media.filepath = process.env.UPLOADS_PATH + media.filename;
    res.json(media);
  } else {
    const error = new Error('Media item not found');
    error.status = 404;
    next(error);
  }
};

/**
 * Return all media items uploaded by the authenticated user.
 *
 * @param {Object} req - HTTP request object, expects JWT middleware to set `req.user`.
 * @param {Object} res - HTTP response object.
 * @returns {void} Sends JSON array of media items for the user or 404 if none found.
 */
const getMediaByUser = async (req, res) => {
  const media = await findMediaByUserId(req.user.user_id);
  if (media) {
    res.json(media);
  }
};

/**
 * Add a new media item to the database.
 *
 * @param {Object} req - HTTP request object, expects `req.body` with title, description, user_id and `req.file` for uploaded file.
 * @param {Object} res - HTTP response object.
 * @returns {void} Sends JSON message with new media ID or 400 on bad request.
 */
const postNewMedia = async (req, res) => {
  // check if file is rejected by multer
  if (!req.file) {
    return res.status(400).json({error: 'Invalid or missing file'});
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  try {
    const {title, description = ''} = req.body;
    const user_id = req.user.user_id; // From authenticateToken middleware
    const {filename, size, mimetype} = req.file;
    if (!filename || !title) return res.sendStatus(400);
    const result = await addMedia({
      user_id,
      filename,
      size,
      mimetype,
      title,
      description,
    });
    res.status(201).json({message: 'New media item added.', ...result});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Modifies media item in the database based on value on media_id
 * Only the file owner or admin can update the media
 *
 * @param {Object} req - HTTP request, expects req.params.id and req.body
 * @param {Object} res - HTTP response
 */
const updateMediaById = async (req, res) => {
  try {
    const mediaId = parseInt(req.params.id);
    const userId = req.user.user_id;
    const isAdmin = req.user.user_level_id === 2;
    const updatedMedia = await updateMedia(mediaId, req.body, userId, isAdmin);
    if (!updatedMedia) {
      return res
        .status(403)
        .json({message: 'Forbidden: cannot edit this media'});
    }
    res.json({message: 'Media updated', item: updatedMedia});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

/**
 * Deletes media item from the database based on value on media_id
 * Only the file owner or admin can delete the media
 *
 * @param {Object} req - HTTP request, expects req.params.id
 * @param {Object} res - HTTP response
 */
const deleteMediaById = async (req, res) => {
  try {
    const mediaId = parseInt(req.params.id);
    const userId = req.user.user_id;
    const isAdmin = req.user.user_level_id === 2;
    const success = await deleteMedia(mediaId, userId, isAdmin);
    if (!success) {
      return res
        .status(403)
        .json({message: 'Forbidden: cannot delete this media'});
    }
    res.json({message: 'Media deleted'});
  } catch (error) {
    res.status(500).json({message: 'Database error', error});
  }
};

export {
  getAllMedia,
  getMediaById,
  getMediaByUser,
  postNewMedia,
  updateMediaById,
  deleteMediaById,
};
