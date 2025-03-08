'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FormInput from '@/components/FormInput';
import { useAuth } from '@/context/AuthContext';
import { validateUsername, validatePassword } from '@/utils/validation';

const LoginPage = () => {
  const { login } = useAuth();
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Error state
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Validate username in real-time
  useEffect(() => {
    if (username) {
      setUsernameError(validateUsername(username));
    }
  }, [username]);
  
  // Validate password in real-time
  useEffect(() => {
    if (password) {
      setPasswordError(validatePassword(password));
    }
  }, [password]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset form error
    setFormError(null);
    
    // Validate all fields
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    
    // Update error states
    setUsernameError(usernameValidation);
    setPasswordError(passwordValidation);
    
    // Check if there are any errors
    if (usernameValidation || passwordValidation) {
      return;
    }
    
    // Submit the form
    setIsLoading(true);
    
    try {
      const result = await login(username, password);
      
      if (!result.success) {
        setFormError(result.message);
      }
    } catch (error) {
      setFormError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome back to SecureConnect
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{formError}</span>
            </div>
          )}
          
          <FormInput
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            placeholder="Enter your username"
            required
            autoComplete="username"
          />
          
          <FormInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 