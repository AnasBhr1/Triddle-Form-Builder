import { useMutation } from '@tanstack/react-query';
import { UploadService } from '../services/uploads';
import { toast } from '../store/toast';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({
      file,
      validation,
    }: {
      file: File;
      validation?: {
        maxSize: number;
        allowedTypes: string[];
        multiple: boolean;
      };
    }) => UploadService.uploadFile(file, validation),
    onError: (error: Error) => {
      toast.error('Upload failed', error.message);
    },
  });
};

export const useUploadMultipleFiles = () => {
  return useMutation({
    mutationFn: (files: File[]) => UploadService.uploadMultipleFiles(files),
    onError: (error: Error) => {
      toast.error('Upload failed', error.message);
    },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: UploadService.deleteFile,
    onSuccess: () => {
      toast.success('File deleted', 'The file has been deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete file', error.message);
    },
  });
};