Setup Instructions
Prerequisites
Node.js (v14 or higher)
PostgreSQL (v12 or higher)
npm or yarn package manager
1. Clone Repository
git clone <repository-url>
cd TaskManagement
2. Install Dependencies
npm install
3. Environment Configuration
Create .env file in root directory:
Port=3000
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=8640000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-db-password
DB_NAME=taskManagement

4. Database Setup
CREATE DATABASE taskManagement;
-- Connect and run schema (assumed separately provided
)
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) UNIQUE NOT NULL,
password TEXT NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
phone_number VARCHAR(100)
);

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
status VARCHAR(20) DEFAULT 'pending',
due_date DATE,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

5. Start Development Server
npm start
