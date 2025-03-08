import 'server-only';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'secure-connect-secret-key';

// User validation functions
export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required';
  if (username.length < 8) return 'Username must be at least 8 characters long';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (!hasLowercase) return 'Password must contain at least one lowercase letter';
  if (!hasUppercase) return 'Password must contain at least one uppercase letter';
  if (!hasSpecialChar) return 'Password must contain at least one special character';
  
  return null;
};

export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 1;
  
  return Math.min(5, strength); // Scale from 0-5
};

// User authentication functions
export const registerUser = async (username: string, password: string) => {
  try {
    // Check if username already exists
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return { success: false, message: 'Username already exists' };
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new user
    await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An error occurred during registration' };
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    // Find the user
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    const user = Array.isArray(users) && users.length > 0 ? users[0] : null;
    
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return { success: false, message: 'Invalid username or password' };
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return { 
      success: true, 
      message: 'Login successful',
      user: { id: user.id, username: user.username },
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, message: 'Invalid token' };
  }
}; 