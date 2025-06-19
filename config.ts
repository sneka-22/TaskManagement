require('dotenv').config();

const CONFIG = {
  PORT: process.env.Port || 3000,
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '8640000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'Password',
  DB_NAME: process.env.DB_NAME || 'taskManagement',
};

module.exports = { CONFIG };
