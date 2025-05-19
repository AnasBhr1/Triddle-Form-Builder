export interface FormResponse {
  id: string;
  formId: string;
  values: Record<string, any>;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    submittedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}// Export types here
export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export type FormFieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date' | 'file';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  order: number;
  options?: { label: string; value: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  defaultValue?: any;
  settings?: Record<string, any>;
}

export interface FormSettings {
  allowMultipleSubmissions: boolean;
  showProgressBar: boolean;
  redirectUrl?: string;
  notificationEmails?: string[];
  submitButtonText: string;
  successMessage: string;
  autoSave?: boolean;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings?: FormSettings;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}