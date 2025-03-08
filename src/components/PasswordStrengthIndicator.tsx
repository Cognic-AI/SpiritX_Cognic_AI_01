'use client';

import React from 'react';
import { calculatePasswordStrength } from '@/utils/validation';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  
  // Define strength labels and colors
  const getStrengthLabel = () => {
    switch (strength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      case 5: return 'Very Strong';
      default: return 'Very Weak';
    }
  };
  
  const getStrengthColor = () => {
    switch (strength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-red-400';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-yellow-400';
      case 4: return 'bg-green-400';
      case 5: return 'bg-green-500';
      default: return 'bg-red-500';
    }
  };
  
  // Calculate width percentage based on strength
  const widthPercentage = (strength / 5) * 100;
  
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Password Strength
        </span>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {getStrengthLabel()}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
        <div 
          className={`h-2 rounded-full ${getStrengthColor()}`} 
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator; 