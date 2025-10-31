// Mock user data
const users = [
  {
    user_id: 260,
    username: 'VCHar',
    password: '********',
    email: 'vchar@example.com',
    user_level_id: 1,
    created_at: '2020-09-12T06:56:41.000Z',
  },
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
  {
    user_id: 3609,
    username: 'Anon5468',
    password: '********',
    email: 'x58df@example.com',
    user_level_id: 3,
    created_at: '2023-04-02T05:56:41.000Z',
  },
];

/**
 * Return all user items from the mock data
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
 */
const getAllUsers = (req, res) => {
  res.json(users);
};

/**
 * Return user item from the mock data based on value on user_id
 *
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 * @returns {void}
 */
const getUserById = (req, res) => {
  const item = users.find((item) => item.user_id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

/**
 * Adds a new user item to the mock data
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const postNewUser = (req, res) => {
  const data = req.body;
  data.user_id = users[users.length - 1].user_id + 1;
  users.push(data);
  res.status(201).json({message: 'new user created', item: data});
};

/**
 * Modifies user item in the mock data based on value on user_id
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const updateUserById = (req, res) => {
  const itemIndex = users.findIndex(
    (item) => item.user_id === parseInt(req.params.id),
  );
  if (itemIndex != -1) {
    users[itemIndex] = {...users[itemIndex], ...req.body};
    res.status(200).json({message: 'user updated', item: users[itemIndex]});
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

/**
 * Deletes user item from the mock data based on value on user_id
 *
 * @param {Object} req HTTP request
 */
const deleteUserById = (req, res) => {
  const userToDelete = users.find(
    (item) => item.user_id === parseInt(req.params.id),
  );
  if (userToDelete != -1) {
    users.splice(userToDelete, 1);
    res.status(200).json({message: 'user deleted'});
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

export {getAllUsers, getUserById, postNewUser, updateUserById, deleteUserById};
