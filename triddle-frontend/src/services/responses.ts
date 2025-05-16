import { apiClient } from '../lib/api-client';
import { FormResponse, FormAnalytics, ApiResponse, PaginationParams } from '../types';

export interface SubmitResponseData {
  responses: Array<{
    questionId: string;
    answer: any;
    timeSpent: number;
  }>;
  status: 'incomplete' | 'completed' | 'abandoned';
  currentQuestionIndex: number;
}

export class ResponseService {
  static async submitResponse(
    formId: string,
    data: SubmitResponseData,
    responseId?: string
  ): Promise<ApiResponse<{
    responseId: string;
    status: string;
    redirectUrl?: string;
  }>> {
    const headers: Record<string, string> = {};
    
    if (responseId) {
      headers['x-response-id'] = responseId;
    }
    
    return apiClient.post(`/forms/${formId}/responses`, data);
  }

  static async getResponses(
    formId: string,
    params?: PaginationParams
  ): Promise<ApiResponse<FormResponse[]>> {
    return apiClient.get<FormResponse[]>(`/forms/${formId}/responses`, params);
  }

  static async getResponse(
    formId: string,
    responseId: string
  ): Promise<ApiResponse<FormResponse>> {
    return apiClient.get<FormResponse>(`/forms/${formId}/responses/${responseId}`);
  }

  static async deleteResponse(
    formId: string,
    responseId: string
  ): Promise<ApiResponse<null>> {
    return apiClient.delete<null>(`/forms/${formId}/responses/${responseId}`);
  }

  static async getAnalytics(formId: string): Promise<ApiResponse<FormAnalytics>> {
    return apiClient.get<FormAnalytics>(`/forms/${formId}/analytics`);
  }
}