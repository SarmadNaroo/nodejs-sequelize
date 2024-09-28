import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables
dotenv.config(); // Call dotenv.config() to load the variables

// Ensure that the DB_URL environment variable is loaded
if (!process.env.DB_URL) {
  throw new Error('DB_URL environment variable is not set.');
}

// Create a new instance of Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

// Function to connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Authenticate the database connection
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

// Export sequelize and connectDB
export { sequelize, connectDB };
