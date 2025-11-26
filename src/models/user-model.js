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

const addUser = async (data) => {
  const [result] = await promisePool.query('INSERT INTO users SET ?', data);
  return {user_id: result.insertId, ...data};
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

export {findAllUsers, findUserById, addUser, updateUser, deleteUser};
