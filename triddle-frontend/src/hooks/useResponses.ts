import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseService, SubmitResponseData } from '../services/responses';
import { PaginationParams } from '../types';
import { toast } from '../store/toast';

export const useResponses = (formId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['forms', formId, 'responses', params],
    queryFn: () => ResponseService.getResponses(formId, params),
    enabled: !!formId,
  });
};

export const useResponse = (formId: string, responseId: string) => {
  return useQuery({
    queryKey: ['forms', formId, 'responses', responseId],
    queryFn: () => ResponseService.getResponse(formId, responseId),
    enabled: !!formId && !!responseId,
  });
};

export const useSubmitResponse = (formId: string) => {
  return useMutation({
    mutationFn: ({ data, responseId }: { data: SubmitResponseData; responseId?: string }) =>
      ResponseService.submitResponse(formId, data, responseId),
    onError: (error: Error) => {
      toast.error('Failed to submit response', error.message);
    },
  });
};

export const useDeleteResponse = (formId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (responseId: string) => ResponseService.deleteResponse(formId, responseId),
    onSuccess: () => {
      toast.success('Response deleted', 'The response has been deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['forms', formId, 'responses'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to delete response', error.message);
    },
  });
};

export const useFormAnalytics = (formId: string) => {
  return useQuery({
    queryKey: ['forms', formId, 'analytics'],
    queryFn: () => ResponseService.getAnalytics(formId),
    enabled: !!formId,
    staleTime: 60 * 1000, // 1 minute
  });
};