import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FormService } from '../services/forms';
import { Form, PaginationParams } from '../types';
import { toast } from '../store/toast';
import { useFormBuilderStore } from '../store/formBuilder';

// Define the CreateFormData interface to match what the service expects
interface CreateFormData {
  title: string;
  description?: string;
  fields?: any[];
  settings?: any;
}

export const useForms = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['forms', params],
    queryFn: () => FormService.getForms(params),
  });
};

export const useForm = (formId: string) => {
  return useQuery({
    queryKey: ['form', formId],
    queryFn: () => FormService.getForm(formId),
    enabled: !!formId,
  });
};

export const useCreateForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Form>) => {
      // Ensure required fields are provided
      const createData: CreateFormData = {
        title: data.title || 'Untitled Form',
        description: data.description,
        fields: data.fields,
        settings: data.settings
      };
      return FormService.createForm(createData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('Form created', 'Your form has been created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create form', error instanceof Error ? error.message : 'An error occurred');
    }
  });
};

export const useUpdateForm = (formId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Form>) => FormService.updateForm(formId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      queryClient.invalidateQueries({ queryKey: ['form', formId] });
      toast.success('Form updated', 'Your form has been updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update form', error instanceof Error ? error.message : 'An error occurred');
    }
  });
};

export const useDeleteForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (formId: string) => FormService.deleteForm(formId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('Form deleted', 'The form has been deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete form', error instanceof Error ? error.message : 'An error occurred');
    }
  });
};

export const usePublishForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (formId: string) => {
      // If publishForm doesn't exist, implement it with updateForm
      return FormService.updateForm(formId, { status: 'published' });
    },
    onSuccess: (_, formId) => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      queryClient.invalidateQueries({ queryKey: ['form', formId] });
      toast.success('Form published', 'Your form is now available for submissions');
    },
    onError: (error) => {
      toast.error('Failed to publish form', error instanceof Error ? error.message : 'An error occurred');
    }
  });
};