import axios from 'axios';
import { PaginationParams } from '../types';

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

export interface SubmitResponseData {
  values: Record<string, any>;
  metadata?: Record<string, any>;
}

export const ResponseService = {
  // Get all responses for a form
  getResponses: async (formId: string, params?: PaginationParams) => {
    const response = await api.get(`/forms/${formId}/responses`, { params });
    return response.data;
  },

  // Get a single response
  getResponse: async (responseId: string, params: any) => {
    const response = await api.get(`/responses/${responseId}`, { params });
    return response.data;
  },

  // Submit a response to a form
  submitResponse: async (formId: string, data: SubmitResponseData) => {
    const response = await api.post(`/forms/${formId}/responses`, data);
    return response.data;
  },

  // Delete a response
  deleteResponse: async (responseId: string, formId: string) => {
    const response = await api.delete(`/forms/${formId}/responses/${responseId}`);
    return response.data;
  }
};