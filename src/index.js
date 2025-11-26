import express from 'express';
import userRouter from './router/user-router.js';
import mediaRouter from './router/media-router.js';
import likeRouter from './router/like-router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Parse json from request body
app.use(express.json());

app.use('/', express.static('public'));
app.use('/media', express.static('media'));

// Api endpoints
app.use('/api/media', mediaRouter);

app.use('/api/user', userRouter);

app.use('/api/likes', likeRouter);

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
