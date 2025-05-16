import { Request } from 'express';
import { Document, Types } from 'mongoose';

// User roles
export enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin'
}

// User interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Question types
export enum QuestionType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  EMAIL = 'email',
  PHONE = 'phone',
  NUMBER = 'number',
  MULTIPLE_CHOICE = 'multiple_choice',
  SINGLE_CHOICE = 'single_choice',
  DROPDOWN = 'dropdown',
  FILE_UPLOAD = 'file_upload',
  DATE = 'date',
  TIME = 'time',
  RATING = 'rating',
  BOOLEAN = 'boolean',
  URL = 'url'
}

// Form question interface
export interface IFormQuestion {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options?: string[]; // For multiple choice, dropdown, etc.
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
  fileUpload?: {
    maxSize: number; // in bytes
    allowedTypes: string[];
    multiple: boolean;
  };
}

// Form interface
export interface IForm extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  slug: string;
  createdBy: Types.ObjectId;
  questions: IFormQuestion[];
  settings: {
    isPublic: boolean;
    isPasswordProtected: boolean;
    password?: string;
    theme: string;
    logo?: string;
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    redirectUrl?: string;
    autoSave: boolean;
    enableAnalytics: boolean;
    multiLanguage: boolean;
    languages: string[];
  };
  isActive: boolean;
  responses: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Form response interface
export interface IFormResponse extends Document {
  _id: Types.ObjectId;
  formId: Types.ObjectId;
  responses: {
    questionId: Types.ObjectId;
    answer: any;
    timeSpent: number; // in seconds
  }[];
  metadata: {
    ipAddress: string;
    userAgent: string;
    geolocation?: {
      country: string;
      city: string;
      coordinates: [number, number];
    };
    referrer?: string;
    device: {
      type: 'mobile' | 'tablet' | 'desktop';
      os: string;
      browser: string;
    };
  };
  status: 'incomplete' | 'completed' | 'abandoned';
  timeStarted: Date;
  timeCompleted?: Date;
  totalTimeSpent: number; // in seconds
  currentQuestionIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

// Extended Request interface for authenticated routes
export interface IAuthenticatedRequest extends Request {
  user?: IUser;
}

// API Response interface
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

// File upload interface
export interface IFileUpload {
  originalName: string;
  filename: string;
  url: string;
  size: number;
  mimetype: string;
  cloudinaryId: string;
}