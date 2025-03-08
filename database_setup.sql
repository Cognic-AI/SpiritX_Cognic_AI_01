-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS secure_connect;

-- Use the database
USE secure_connect;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- You can add some test users if needed (passwords are hashed)
-- The following password is 'Test123!' hashed with bcrypt
-- INSERT INTO users (username, password) VALUES 
-- ('testuser1', '$2a$10$XFE/UzEy.jOw8XvPRFtxwO.XlKqGzR.Pv5ei1mWNyMoRy3Hl.GR8a'); 