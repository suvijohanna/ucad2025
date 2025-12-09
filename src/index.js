import express from 'express';
import helmet from 'helmet';
import path from 'path';
import {fileURLToPath} from 'url';
import userRouter from './router/user-router.js';
import mediaRouter from './router/media-router.js';
import likeRouter from './router/like-router.js';
import authRouter from './router/auth-router.js';
import 'dotenv/config';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();

// Parse JSON
app.use(express.json());

// Helmet with default security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
      },
    },
  }),
);

// Serve static files
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

// Serve API documentation with relaxed CSP to allow Apidoc eval()
app.use(
  '/docs',
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
    },
  }),
  express.static(path.join(__dirname, '../docs')),
);

// API endpoints
app.use('/api/media', mediaRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/likes', likeRouter);

// Not found handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
