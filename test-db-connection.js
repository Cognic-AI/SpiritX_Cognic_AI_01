// This script tests the database connection
// Run it with: node test-db-connection.js

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'secure_connect',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
  });

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log('✅ Successfully connected to MySQL database!');
    
    // Test query to check if the users table exists
    const [rows] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ? AND table_name = 'users'
    `, [process.env.DB_NAME || 'secure_connect']);
    
    if (rows.length > 0) {
      console.log('✅ Users table exists in the database.');
    } else {
      console.log('❌ Users table does not exist. Please run the database setup script.');
    }
    
    // Release the connection
    connection.release();
  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    // End the pool
    await pool.end();
  }
}

testConnection(); 