# SecureConnect

SecureConnect is a secure authentication system built with Next.js, TypeScript, and MySQL. It provides a robust user authentication flow with real-time validation and session management.

## Features

### Signup Page
- Username, Password, and Confirm Password fields with validation
- Real-time error display under each input field
- Username validation (minimum 8 characters, uniqueness check)
- Password complexity requirements (lowercase, uppercase, special character)
- Password strength indicator
- Confirmation dialog after successful signup
- Automatic redirection to login page after signup

### Login Page
- Username and Password fields with validation
- Real-time error display
- Session management with JWT tokens
- Secure authentication flow

### Dashboard
- Personalized welcome message
- Session information display
- Logout functionality

## Technologies Used

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- MySQL (for user data storage)
- bcryptjs (for password hashing)
- JSON Web Tokens (for session management)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL server

### Database Setup

1. Create a MySQL database named `secure_connect` by running the provided SQL script:
   ```bash
   mysql -u root -p < database_setup.sql
   ```
   
   Or manually execute these SQL commands in your MySQL client:
   ```sql
   CREATE DATABASE IF NOT EXISTS secure_connect;
   USE secure_connect;
   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. Configure your database connection in `.env.local` (see below)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=secure_connect
JWT_SECRET=your_jwt_secret_key
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and database connection
- `/src/context` - React context for authentication state
- `/src/app/api` - API routes for authentication

## Security Features

- Password hashing with bcryptjs
- HTTP-only cookies for JWT storage
- Real-time validation
- Password strength indicator
- Session management

## License

This project is licensed under the MIT License.
