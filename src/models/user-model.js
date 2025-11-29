import promisePool from '../utils/database.js';

/**
 * Fetch all users (public info only, no passwords).
 *
 * @returns {Promise<Array>} List of users
 */
const findAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, user_level_id FROM Users',
  );
  return rows;
};

/**
 * Fetch a single user by ID (public info only, no password).
 *
 * @param {number} id - User ID
 * @returns {Promise<Object|null>} User object or null if not found
 */
const findUserById = async (id) => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, user_level_id FROM Users WHERE user_id = ?',
    [id],
  );
  return rows[0];
};

/**
 * Fetch full user row (including password) by username.
 * Used for login/authentication.
 *
 * @param {string} username - Username to search
 * @returns {Promise<Object|null|{error: string}>}
 */
const selectUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM Users WHERE username = ?',
      [username],
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
 * Insert a new user into the database.
 *
 * @param {Object} user - User data
 * @param {string} user.username
 * @param {string} user.email
 * @param {string} user.password - Hashed password
 * @returns {Promise<number|{error: string}>} Inserted user ID or error
 */
const addUser = async (user) => {
  try {
    const sql = `
      INSERT INTO Users (username, email, password, user_level_id)
      VALUES (?, ?, ?, ?)
    `;
    const params = [user.username, user.email, user.password, 1]; // default user level = 1
    const [result] = await promisePool.query(sql, params);
    return result.insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
 * Update user data fields by ID.
 *
 * @param {number} id - User ID
 * @param {Object} data - Fields to update (e.g. {email: "new@x.com"})
 * @returns {Promise<Object|null>} Updated user object
 */
const updateUser = async (id, data) => {
  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = Object.values(data);

  await promisePool.query(`UPDATE Users SET ${fields} WHERE user_id = ?`, [
    ...values,
    id,
  ]);

  return findUserById(id);
};

/**
 * Delete user by ID.
 *
 * @param {number} id - User ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
const deleteUser = async (id) => {
  const [result] = await promisePool.query(
    'DELETE FROM Users WHERE user_id = ?',
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
