import {
  listAllMedia,
  findMediaById,
  addMedia,
  updateMedia,
  deleteMedia,
} from '../models/media-model.js';

/**
 * Return all media items from the mock data
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
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
 * Return media item from database based on value on media_id
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
 */
const getMediaById = async (req, res) => {
  const media = findMediaById(req.params.id);
  if (media) {
    media.filepath = `${req.protocol}://${req.headers.host}/${process.env.UPLOADS_PATH}/${media.filename}`;
    res.json(media);
  } else {
    res.status(404).json({message: 'media not found'});
  }
};

/**
 * Adds a new media item to the database
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const postNewMedia = async (req, res) => {
  let {title, description, user_id} = req.body;
  // Replace description with empty string if undefined
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
 * Modifies media item in the database based on value on media_id
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const updateMediaById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const existingMedia = await findMediaById(id);
  if (!existingMedia) {
    return res.status(404).json({message: 'media item not found'});
  }

  const success = await updateMedia(id, data);
  if (success === true) {
    res.status(200).json({message: 'item updated', updated: {id, ...data}});
  } else {
    res.status(500).json({message: 'database error', error: success.error});
  }
};

/**
 * Deletes media item from the database based on value on media_id
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const deleteMediaById = async (req, res) => {
  const id = req.params.id;
  const existingMedia = await findMediaById(id);
  if (!existingMedia) {
    return res.status(404).json({message: 'media item not found'});
  }

  const success = await deleteMedia(id);
  if (success === true) {
    res.status(200).json({message: 'item deleted'});
  } else {
    res.status(500).json({message: 'database error', error: success.error});
  }
};

export {
  getAllMedia,
  getMediaById,
  postNewMedia,
  updateMediaById,
  deleteMediaById,
};
