import { apiClient } from '../lib/api-client';
import { User, ApiResponse } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export class AuthService {
  static async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  }

  static async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  }

  static async logout(): Promise<ApiResponse<null>> {
    return apiClient.post<null>('/auth/logout');
  }

  static async getMe(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }

  static async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    return apiClient.post<{ accessToken: string }>('/auth/refresh-token');
  }

  static async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse<null>> {
    return apiClient.post<null>('/auth/forgot-password', data);
  }

  static async resetPassword(data: ResetPasswordData): Promise<ApiResponse<null>> {
    return apiClient.post<null>('/auth/reset-password', data);
  }
}