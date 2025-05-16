import { apiClient } from '../lib/api-client';
import { Form, ApiResponse, PaginationParams } from '../types';

export interface CreateFormData {
  title: string;
  description?: string;
  questions: any[];
  settings: any;
}

export class FormService {
  static async createForm(data: CreateFormData): Promise<ApiResponse<Form>> {
    return apiClient.post<Form>('/forms', data);
  }

  static async getForms(params?: PaginationParams): Promise<ApiResponse<Form[]>> {
    return apiClient.get<Form[]>('/forms', params);
  }

  static async getForm(id: string): Promise<ApiResponse<Form>> {
    return apiClient.get<Form>(`/forms/${id}`);
  }

  static async getFormBySlug(slug: string): Promise<ApiResponse<Form>> {
    return apiClient.get<Form>(`/forms/public/${slug}`);
  }

  static async updateForm(id: string, data: Partial<Form>): Promise<ApiResponse<Form>> {
    return apiClient.put<Form>(`/forms/${id}`, data);
  }

  static async deleteForm(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete<null>(`/forms/${id}`);
  }

  static async toggleFormStatus(id: string): Promise<ApiResponse<Form>> {
    return apiClient.patch<Form>(`/forms/${id}/toggle-status`);
  }

  static async duplicateForm(id: string): Promise<ApiResponse<Form>> {
    return apiClient.post<Form>(`/forms/${id}/duplicate`);
  }
}