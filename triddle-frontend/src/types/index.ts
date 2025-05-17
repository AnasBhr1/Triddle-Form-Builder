// Add these basic types to make the app compile

export enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Basic interfaces to make the app compile
export interface Form {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  createdBy: string | User;
  questions: FormQuestion[];
  settings: FormSettings;
  isActive: boolean;
  responses: string[];
  responseCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormQuestion {
  _id?: string;
  title: string;
  description?: string;
  type: string;
  required: boolean;
  order: number;
  options?: string[];
  validation?: any;
  fileUpload?: any;
}

export interface FormSettings {
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
}

export interface FormResponse {
  _id: string;
  formId: string;
  responses: any[];
  metadata: any;
  status: string;
  timeStarted: Date;
  timeCompleted?: Date;
  totalTimeSpent: number;
  currentQuestionIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormAnalytics {
  overview: any;
  deviceStats: any[];
  geoStats: any[];
  completionByDate: any[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | any;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface FileUpload {
  originalName: string;
  filename: string;
  url: string;
  size: number;
  mimetype: string;
  cloudinaryId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FormBuilderState {
  currentForm: Form | null;
  currentQuestionIndex: number;
  isPreviewMode: boolean;
  isDirty: boolean;
  lastSaved?: Date;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}