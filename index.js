import dotenv from 'dotenv';
dotenv.config();

import { httpServer } from './app.js';
import { connectDB } from './config/db.config.js'; 

const startServer = async () => {
  await connectDB(); // Connect to the database

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

// Start the server
startServer();
