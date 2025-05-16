import { apiClient } from '../lib/api-client';
import { FileUpload, ApiResponse } from '../types';

export class UploadService {
  static async uploadFile(
    file: File,
    validation?: {
      maxSize: number;
      allowedTypes: string[];
      multiple: boolean;
    }
  ): Promise<ApiResponse<FileUpload>> {
    const endpoint = validation ? '/uploads/form-file' : '/uploads/single';
    const additionalData = validation ? {
      maxSize: validation.maxSize.toString(),
      allowedTypes: JSON.stringify(validation.allowedTypes),
      multiple: validation.multiple.toString()
    } : undefined;

    return apiClient.uploadFile<FileUpload>(endpoint, file, additionalData);
  }

  static async uploadMultipleFiles(files: File[]): Promise<ApiResponse<FileUpload[]>> {
    return apiClient.uploadFiles<FileUpload[]>('/uploads/multiple', files);
  }

  static async deleteFile(cloudinaryId: string): Promise<ApiResponse<null>> {
    return apiClient.delete<null>(`/uploads/${cloudinaryId}`);
  }
}