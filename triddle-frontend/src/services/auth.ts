import axios from 'axios';
import type { LoginCredentials, RegisterData } from '../types';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || '';

// Create axios instance with base options
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Export LoginCredentials and RegisterData types
export type { LoginCredentials, RegisterData };

export const AuthService = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Register user
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    localStorage.removeItem('token');
    return { success: true };
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
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