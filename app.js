// app.js
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from server'); // Response when the root URL is accessed
});

// Example route for authentication (you can customize this later)
app.use('/api/auth', authRoutes); // Importing authentication routes

// Protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'You are authorized!', userId: req.userId });
});

// Export the Express app instance
export const httpServer = app;
