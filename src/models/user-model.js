import promisePool from '../utils/database.js';

/**
 * Fetch all users (public info only, no passwords).
 *
 * @returns {Promise<Array>} Array of users
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
  return rows[0] ?? null;
};

/**
 * Fetch full user row (including password) by username.
 * Used for login/authentication.
 *
 * @param {string} username - Username to search
 * @returns {Promise<Object|null>} User object (including password hash) or null if not found
 */
const selectUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM Users WHERE username = ?',
    [username],
  );
  return rows[0] ?? null;
};

/**
 * Insert a new user into the database with default user level 1 (normal user).
 *
 * The user's password should already be hashed before calling this function.
 *
 * @param {Object} user - User data
 * @param {string} user.username - Username of the new user
 * @param {string} user.email - Email address of the new user
 * @param {string} user.password - Hashed password of the new user
 * @returns {Promise<number>} Resolves with the inserted user's ID
 * @throws {Error} Throws an error if the database operation fails
 *
 * @example
 * const hashedPassword = await bcrypt.hash('secret123', 10);
 * const userId = await addUser({ username: 'matti', email: 'matti@example.com', password: hashedPassword });
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
    throw new Error(`Database error: ${e.message}`);
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
