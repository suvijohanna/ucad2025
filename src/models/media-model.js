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

const updateMedia = async (id, media) => {
  const {title, description} = media;
  const sql = `UPDATE mediaItems, SET title = ?, description = ?`;
  try {
    const [result] = await promisePool.execute(sql, [title, description, id]);
    return result.affectedRows > 0;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const deleteMedia = async (id) => {
  const sql = `DELETE FROM mediaItems WHERE media_id = ?`;
  try {
    const [result] = await promisePool.execute(sql, [id]);
    return result.affectedRows > 0;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {listAllMedia, findMediaById, addMedia, updateMedia, deleteMedia};
