import 'server-only';
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'secure_connect',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for use in other files
export default pool; 