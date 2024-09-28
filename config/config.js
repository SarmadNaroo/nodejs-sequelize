import dotenv from 'dotenv';
dotenv.config(); // Load .env file

export default {
  development: {
    url: process.env.DB_URL, // Use the DB_URL from .env
    dialect: 'postgres',
  },
  test: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  },
};
