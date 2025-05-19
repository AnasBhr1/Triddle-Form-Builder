import axios from 'axios';
import type { LoginCredentials, RegisterData } from '../types';

// Base API URL - Make sure you have this environment variable set!
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API URL being used:', API_URL); // Add this for debugging

// Create axios instance with base options
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Ensure credentials (cookies) are sent with requests
  withCredentials: true
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Ensure the Authorization header is in the correct format
    // Check your backend to confirm if it needs 'Bearer ' prefix
    config.headers.Authorization = `Bearer ${token}`;
    
    // Debugging
    console.log('Auth header set:', `Bearer ${token.substring(0, 15)}...`);
  }
  return config;
});

// Add error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      
      // Enhance the error object with the backend's error message if available
      if (error.response.data && error.response.data.message) {
        error.message = error.response.data.message;
      } else if (error.response.data && error.response.data.error) {
        error.message = error.response.data.error;
      } else if (error.response.status === 400) {
        error.message = 'Invalid form data. Please check your inputs.';
      }
    } else if (error.request) {
      console.error('Request made but no response received');
      error.message = 'Server not responding. Please try again later.';
    }
    return Promise.reject(error);
  }
);

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export const AuthService = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    try {
      console.log("Login request payload:", credentials);
      const response = await api.post('/auth/login', credentials);
      console.log("Login response:", response.data);
      
      // Store token correctly based on backend response structure
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      } else if (response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // Register user
  register: async (data: RegisterData) => {
    try {
      // Format the data exactly as the backend expects it
      const registrationData = {
        firstName: data.firstName,
        lastName: data.lastName || '',  // Provide empty string if lastName is not provided
        email: data.email,
        password: data.password,
        // Add any other required fields your backend might expect
      };
      
      console.log("Register request payload:", registrationData);
      const response = await api.post('/auth/register', registrationData);
      console.log("Register response:", response.data);
      
      // Store token correctly based on backend response structure
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      } else if (response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Try to call the logout endpoint if it exists
      try {
        await api.post('/auth/logout');
      } catch (e) {
        // If there's no logout endpoint, just continue
        console.log('No logout endpoint or logout failed on server');
      }
      
      // Always clear local storage
      localStorage.removeItem('token');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if API call fails
      localStorage.removeItem('token');
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      // Log the current token to help debug
      const token = localStorage.getItem('token');
      console.log('getCurrentUser using token:', token ? `${token.substring(0, 15)}...` : 'No token');
      
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      console.error('Error getting current user:', error);
      // Handle token validation error by clearing the token
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
      }
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data: ResetPasswordData) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  }
};