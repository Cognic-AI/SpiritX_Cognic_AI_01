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