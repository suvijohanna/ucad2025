import promisePool from '../utils/database.js';

const findAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.query(
    'SELECT * FROM users WHERE user_id = ?',
    [id],
  );
  return rows[0];
};

const selectUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM Users WHERE username = ?',
      [username],
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addUser = async (user) => {
  const {username, password, email, user_level_id} = user;
  const sql = `INSERT INTO Users (username, password, email, user_level_id)
               VALUES (?, ?, ?, ?)`;
  const params = [username, password, email, user_level_id];
  try {
    const [result] = await promisePool.execute(sql, params);
    return {user_id: result.insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateUser = async (id, data) => {
  await promisePool.query('UPDATE users SET ? WHERE user_id = ?', [data, id]);
  return findUserById(id);
};

const deleteUser = async (id) => {
  const [result] = await promisePool.query(
    'DELETE FROM users WHERE user_id = ?',
    [id],
  );
  return result.affectedRows > 0;
};

export {
  findAllUsers,
  findUserById,
  selectUserByUsername,
  addUser,
  updateUser,
  deleteUser,
};
