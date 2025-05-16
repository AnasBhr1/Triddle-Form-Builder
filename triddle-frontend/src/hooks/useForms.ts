import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FormService } from '../services/forms';
import { Form, PaginationParams } from '../types';
import { toast } from '../store/toast';
import { useFormBuilderStore } from '../store/formBuilder';

export const useForms = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['forms', params],
    queryFn: () => FormService.getForms(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useForm = (id: string) => {
  return useQuery({
    queryKey: ['forms', id],
    queryFn: () => FormService.getForm(id),
    enabled: !!id,
  });
};

export const useFormBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['forms', 'public', slug],
    queryFn: () => FormService.getFormBySlug(slug),
    enabled: !!slug,
    retry: false,
  });
};

export const useCreateForm = () => {
  const queryClient = useQueryClient();
  const { setCurrentForm } = useFormBuilderStore();

  return useMutation({
    mutationFn: FormService.createForm,
    onSuccess: (response) => {
      toast.success('Form created', 'Your form has been created successfully');
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      if (response.data) {
        setCurrentForm(response.data);
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to create form', error.message);
    },
  });
};

export const useUpdateForm = (id: string) => {
  const queryClient = useQueryClient();
  const { setCurrentForm, setDirty } = useFormBuilderStore();

  return useMutation({
    mutationFn: (data: Partial<Form>) => FormService.updateForm(id, data),
    onSuccess: (response) => {
      toast.success('Form updated', 'Your changes have been saved');
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      queryClient.invalidateQueries({ queryKey: ['forms', id] });
      if (response.data) {
        setCurrentForm(response.data);
        setDirty(false);
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to update form', error.message);
    },
  });
};

export const useDeleteForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FormService.deleteForm,
    onSuccess: () => {
      toast.success('Form deleted', 'The form has been deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to delete form', error.message);
    },
  });
};

export const useToggleFormStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FormService.toggleFormStatus,
    onSuccess: (response) => {
      const status = response.data?.isActive ? 'activated' : 'deactivated';
      toast.success(`Form ${status}`, `The form has been ${status} successfully`);
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to update form status', error.message);
    },
  });
};

export const useDuplicateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FormService.duplicateForm,
    onSuccess: () => {
      toast.success('Form duplicated', 'The form has been duplicated successfully');
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to duplicate form', error.message);
    },
  });
};

// Auto-save hook
export const useAutoSave = (formId: string) => {
  const { currentForm, isDirty, autoSave } = useFormBuilderStore();
  const updateFormMutation = useUpdateForm(formId);

  const triggerAutoSave = async () => {
    if (!currentForm || !isDirty) return;

    try {
      await updateFormMutation.mutateAsync(currentForm);
      autoSave();
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  return {
    triggerAutoSave,
    isAutoSaving: updateFormMutation.isPending,
  };
};