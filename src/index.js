import express from 'express';
import userRouter from './router/user-router.js';
import mediaRouter from './router/media-router.js';
import authRouter from './router/auth-router.js';
// read .env file
import 'dotenv/config';

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();

// console.log(process.env);

// Parse json from request body
app.use(express.json());

// Serve static files
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

// Api endpoints
app.use('/api/media', mediaRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
