import express from 'express';
import {
  mediaItems,
  deleteMediaById,
  getAllMedia,
  getMediaById,
  postNewMedia,
  updateMediaById,
} from './media.js';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  postNewUser,
  updateUserById,
} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// const items = [
//   {id: 1, name: 'Item One'},
//   {id: 2, name: 'Item Two'},
// ];

// Config for Pug template engine
app.set('views', './views');
app.set('view engine', 'pug');

// Parse json from request body
app.use(express.json());

// Serve Pug template (server root)
app.get('/', (req, res) => {
  const hostUrl = `${req.protocol}://${req.get('host')}`;
  const itemsWithUrls = mediaItems.map((item) => ({
    ...item,
    url: `${hostUrl}/media/${item.filename}`,
  }));

  const content = {
    title: 'Media Gallery',
    text: 'Mediatiedostot palvelimelta',
    items: itemsWithUrls,
  };
  res.render('index', content);
});

app.use('/', express.static('public'));
app.use('/media', express.static('media'));

// Media endpoints

// Get all media items
app.get('/api/media', getAllMedia);
// Get media item by id
app.get('/api/media/:id', getMediaById);
// Post new media item
app.post('/api/media', postNewMedia);
// Update media item by id
app.put('/api/media/:id', updateMediaById);
// Delete media item by id
app.delete('/api/media/:id', deleteMediaById);

// Users endpoints

// Get all users
app.get('/api/user', getAllUsers);
// Get user by id
app.get('/api/user/:id', getUserById);
// Post new user
app.post('/api/user', postNewUser);
// Update user by id
app.put('/api/user/:id', updateUserById);
// Delete user by id
app.delete('/api/user/:id', deleteUserById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
