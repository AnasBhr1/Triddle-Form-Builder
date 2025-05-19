/**
 * Utility functions for handling authentication tokens
 * This works with both JWT tokens stored in localStorage and HTTP-only cookies
 */

// Get the token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set the token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove the token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Parse JWT token without external libraries
export const parseJwt = (token: string): any => {
  try {
    // Split the token and get the payload part (second part)
    const base64Url = token.split('.')[1];
    // Replace characters for base64 decoding
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decode and parse
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return true;
    
    // Convert exp to milliseconds and compare with current time
    const expiryTime = decoded.exp * 1000; // exp is in seconds
    return Date.now() >= expiryTime;
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return true; // If there's an error, consider token expired
  }
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

// Get user info from token
export const getUserFromToken = (): any => {
  const token = getToken();
  if (!token) return null;
  
  return parseJwt(token);
};

export default {
  getToken,
  setToken,
  removeToken,
  parseJwt,
  isTokenExpired,
  isAuthenticated,
  getUserFromToken
};