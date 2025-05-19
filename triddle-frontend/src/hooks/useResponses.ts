import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseService, SubmitResponseData } from '../services/responses';
import { PaginationParams } from '../types';
import { toast } from '../store/toast';

// Extend SubmitResponseData to include formId
interface ExtendedSubmitResponseData extends SubmitResponseData {
  formId: string;
}

export const useResponses = (formId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['responses', formId, params],
    queryFn: () => ResponseService.getResponses(formId, params),
    enabled: !!formId,
  });
};

export const useResponse = (responseId: string) => {
  return useQuery({
    queryKey: ['response', responseId],
    queryFn: () => ResponseService.getResponse(responseId, {}), // Adding an empty object as second parameter
    enabled: !!responseId,
  });
};

export const useSubmitResponse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ExtendedSubmitResponseData) => {
      const { formId, ...submitData } = data;
      return ResponseService.submitResponse(formId, submitData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['responses', variables.formId] });
      toast.success('Response submitted', 'Thank you for your submission!');
    },
    onError: (error) => {
      toast.error('Failed to submit response', error instanceof Error ? error.message : 'An error occurred');
    }
  });
};

export const useDeleteResponse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ responseId, formId }: { responseId: string; formId: string }) => 
      ResponseService.deleteResponse(responseId, formId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['responses', variables.formId] });
      toast.success('Response deleted', 'The response has been deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete response', error instanceof Error ? error.message : 'An error occurred');
    }
  });
};