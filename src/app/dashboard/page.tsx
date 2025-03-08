'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

const DashboardPage = () => {
  const { user, logout, loading } = useAuth();
  
  // Handle logout
  const handleLogout = async () => {
    await logout();
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Hello, {user?.username}!
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Welcome to your secure dashboard.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Secure Session
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                You are now logged in securely. Your session will remain active until you click the Logout button.
              </p>
              
              <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Session Information
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Username
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user?.username}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      User ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user?.id}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Session Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 