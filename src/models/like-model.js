import promisePool from '../utils/database.js';

// All likes for a specific media item
const getLikesByMediaId = async (media_id) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM likes WHERE media_id = ?',
    [media_id],
  );
  return rows;
};

// Get all likes for a specific user
const getLikesByUserId = async (user_id) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM likes WHERE user_id = ?',
    [user_id],
  );
  return rows;
};

// Add new like
const addLike = async ({user_id, media_id}) => {
  const [result] = await promisePool.query(
    'INSERT INTO likes (user_id, media_id) VALUES (?, ?)',
    [user_id, media_id],
  );
  return {like_id: result.insertId, user_id, media_id};
};

// Delete like
const deleteLike = async (like_id) => {
  const [result] = await promisePool.query(
    'DELETE FROM likes WHERE like_id = ?',
    [like_id],
  );
  return result.affectedRows > 0;
};

export {getLikesByMediaId, getLikesByUserId, addLike, deleteLike};
