import { z } from 'zod';

// Registration form validation schema
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

// Reset password validation schema
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Form creation validation schema
export const createFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

// Form field validation schema based on field type
export const formFieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'email', 'number', 'select', 'checkbox', 'radio', 'textarea', 'date', 'file']),
  label: z.string().min(1, 'Label is required'),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
});

// Form settings validation schema
export const formSettingsSchema = z.object({
  allowMultipleSubmissions: z.boolean().default(false),
  showProgressBar: z.boolean().default(true),
  redirectUrl: z.string().url().optional(),
  notificationEmails: z.array(z.string().email()).optional(),
  submitButtonText: z.string().default('Submit'),
  successMessage: z.string().default('Form submitted successfully'),
});