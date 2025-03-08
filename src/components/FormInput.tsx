import React, { useState, useEffect } from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string | null;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  autoComplete,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Show error after user has interacted with the field
  useEffect(() => {
    if (value && error) {
      setShowError(true);
    } else if (!error) {
      setShowError(false);
    }
  }, [value, error]);
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur();
          if (error) setShowError(true);
        }}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
          showError && error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
        }`}
        required={required}
      />
      {showError && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput; 