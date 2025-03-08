'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormInput from '@/components/FormInput';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { useAuth } from '@/context/AuthContext';
import { validateUsername, validatePassword } from '@/utils/validation';

const SignupPage = () => {
  const router = useRouter();
  const { register } = useAuth();
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Error state
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  
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
  
  // Validate confirm password in real-time
  useEffect(() => {
    if (confirmPassword) {
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setConfirmPasswordError(null);
      }
    }
  }, [password, confirmPassword]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset form error
    setFormError(null);
    
    // Validate all fields
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = password !== confirmPassword ? 'Passwords do not match' : null;
    
    // Update error states
    setUsernameError(usernameValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);
    
    // Check if there are any errors
    if (usernameValidation || passwordValidation || confirmPasswordValidation) {
      return;
    }
    
    // Submit the form
    setIsLoading(true);
    
    try {
      const result = await register(username, password, confirmPassword);
      
      if (result.success) {
        setIsSuccess(true);
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setFormError(result.message);
      }
    } catch (error) {
      setFormError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join SecureConnect today
          </p>
        </div>
        
        {isSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Account created successfully. Redirecting to login...</span>
          </div>
        ) : (
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
              placeholder="Enter a username (min. 8 characters)"
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
              placeholder="Enter a strong password"
              required
              autoComplete="new-password"
            />
            
            {password && <PasswordStrengthIndicator password={password} />}
            
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
            />
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage; 