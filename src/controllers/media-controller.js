import {validationResult} from 'express-validator';
import {addMedia, findMediaById, listAllMedia} from '../models/media-model.js';

/**
 * Return all media items from the mock data
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
 */
const getMedia = async (req, res) => {
  res.json(await listAllMedia());
};

/**
 * Return media item from the mock data based on value on media_id
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
 */
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

const getMediaByUser = async (req, res) => {
  const media = await findMediaByUserId(req.user.user_id);
  if (media) {
    res.json(media);
  }
};

/**
 * Adds a new media item to the mock data
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const postMedia = async (req, res) => {
  // check if file is rejected by multer
  if (!req.file) {
    return res.status(400).json({error: 'Invalid or missing file'});
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  let {title, description} = req.body;
  const user_id = req.user.user_id;
  // replace undefined description with empty string
  description = description ? description : '';
  console.log('req file by multer', req.file);
  const {filename, size, mimetype} = req.file;
  if (filename && title && user_id) {
    const result = await addMedia({
      user_id,
      filename,
      size,
      mimetype,
      title,
      description,
    });
    res.status(201);
    res.json({message: 'New media item added.', ...result});
  } else {
    res.sendStatus(400);
  }
};

/**
 * Modifies media item in the mock data based on value on media_id
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const updateMediaById = (req, res) => {
  const itemIndex = mediaItems.findIndex(
    (item) => item.media_id === parseInt(req.params.id),
  );
  if (itemIndex != -1) {
    mediaItems[itemIndex] = {...mediaItems[itemIndex], ...req.body};
    res
      .status(200)
      .json({message: 'item updated', item: mediaItems[itemIndex]});
  } else {
    res.status(404).json({message: 'media item not found'});
  }
};

/**
 * Deletes media item from the mock data based on value on media_id
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const deleteMediaById = (req, res) => {
  const itemToDelete = mediaItems.find(
    (item) => item.media_id === parseInt(req.params.id),
  );
  if (itemToDelete != -1) {
    mediaItems.splice(itemToDelete, 1);
    res.status(200).json({message: 'item deleted'});
  } else {
    res.status(404).json({message: 'media item not found'});
  }
};

export {
  getMedia,
  getMediaById,
  getMediaByUser,
  postMedia,
  updateMediaById,
  deleteMediaById,
};
