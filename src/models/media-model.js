import promisePool from '../utils/database.js';

const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM mediaItems');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMediaByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM MediaItems WHERE user_id = ?',
      [userId],
    );
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMediaById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM mediaItems WHERE media_id = ?',
      [id],
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addMedia = async (media) => {
  const {user_id, filename, size, mimetype, title, description} = media;
  const sql = `INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const [result] = await promisePool.execute(sql, params);
    return {media_id: result.insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateMedia = async (mediaId, data, userId, isAdmin = false) => {
  try {
    let sql, params;
    if (isAdmin) {
      sql =
        'UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ?';
      params = [data.title, data.description, mediaId];
    } else {
      sql =
        'UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ? AND user_id = ?';
      params = [data.title, data.description, mediaId, userId];
    }
    const [result] = await promisePool.query(sql, params);
    return result.affectedRows > 0;
  } catch (error) {
    return {error};
  }
};

const deleteMedia = async (mediaId, userId, isAdmin = false) => {
  try {
    let sql, params;
    if (isAdmin) {
      sql = 'DELETE FROM MediaItems WHERE media_id = ?';
      params = [mediaId];
    } else {
      sql = 'DELETE FROM MediaItems WHERE media_id = ? AND user_id = ?';
      params = [mediaId, userId];
    }
    const [result] = await promisePool.query(sql, params);
    return result.affectedRows > 0;
  } catch (error) {
    return {error};
  }
};

export {
  listAllMedia,
  findMediaById,
  findMediaByUserId,
  addMedia,
  updateMedia,
  deleteMedia,
};
