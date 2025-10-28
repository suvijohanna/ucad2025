import express from 'express';
import {
  deleteMediaById,
  getAllMedia,
  getMediaById,
  postNewMedia,
} from './media.js';
import {users} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const items = [
  {id: 1, name: 'Item One'},
  {id: 2, name: 'Item Two'},
];

// Config for Pug template engine
app.set('views', './views');
app.set('view engine', 'pug');

// Parse json from request body
app.use(express.json());

// Serve Pug template (server root)
app.get('/', (req, res) => {
  const content = {
    title: 'My Pug page',
    text: 'tässä tallennetut itemit',
    items,
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
// Delete media item by id
app.delete('/api/media/:id', deleteMediaById);

// Users endpoints

// Get all users
app.get('/api/user', (req, res) => {
  res.json(users);
});

// Endpoints for /items
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  // TODO: choose correct item based on id and send it
  res.json({request_id: req.params.id});
});

app.delete('/api/items/:id', (req, res) => {
  // TODO: delete correct item based on id
  res.json({delete_id: req.params.id});
});

app.post('/api/items', (req, res) => {
  // TODO: add new item to items[]
  // TODO: add created item to response
  res.sendStatus(201);
});

app.put('/api/items/:id', (req, res) => {
  // TODO: modify correct item based on id
  res.json({modify_id: req.params.id});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
