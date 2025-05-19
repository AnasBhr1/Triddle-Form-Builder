import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || '';

// Create axios instance with base options
const api = axios.create({
  baseURL: API_URL
  // Don't set Content-Type header for file uploads - it will be set automatically
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const UploadService = {
  // Upload a file
  uploadFile: async (formData: FormData) => {
    const response = await api.post('/uploads', formData);
    return response.data;
  },

  // Delete a file
  deleteFile: async (fileId: string) => {
    const response = await api.delete(`/uploads/${fileId}`);
    return response.data;
  }
};