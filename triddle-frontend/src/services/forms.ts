import axios from 'axios';
import { Form, PaginationParams } from '../types';

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

export interface CreateFormData {
  title: string;
  description?: string;
  fields?: any[];
  settings?: any;
}

export interface UpdateFormData {
  title?: string;
  description?: string;
  fields?: any[];
  settings?: any;
  status?: string;
}

export const FormService = {
  // Get all forms
  getForms: async (params?: PaginationParams) => {
    const response = await api.get('/forms', { params });
    return response.data;
  },

  // Get a single form
  getForm: async (formId: string) => {
    const response = await api.get(`/forms/${formId}`);
    return response.data;
  },

  // Create a new form
  createForm: async (data: CreateFormData) => {
    const response = await api.post('/forms', data);
    return response.data;
  },

  // Update an existing form
  updateForm: async (formId: string, data: UpdateFormData) => {
    const response = await api.put(`/forms/${formId}`, data);
    return response.data;
  },

  // Delete a form
  deleteForm: async (formId: string) => {
    const response = await api.delete(`/forms/${formId}`);
    return response.data;
  }
};