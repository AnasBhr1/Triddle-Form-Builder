import { useMutation } from '@tanstack/react-query';
import { UploadService } from '../services/uploads';
import { toast } from '../store/toast';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      // Fix the method name to match the service
      return UploadService.uploadFile(formData);
    },
    onSuccess: () => {
      toast.success('File uploaded', 'Your file has been uploaded successfully');
    },
    onError: (error) => {
      toast.error('Upload failed', error instanceof Error ? error.message : 'An error occurred while uploading your file');
    }
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (fileId: string) => UploadService.deleteFile(fileId),
    onSuccess: () => {
      toast.success('File deleted', 'The file has been deleted successfully');
    },
    onError: (error) => {
      toast.error('Delete failed', error instanceof Error ? error.message : 'An error occurred while deleting the file');
    }
  });
};