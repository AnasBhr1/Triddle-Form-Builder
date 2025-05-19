import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Form, FormSettings } from '../types';

// Define a union type for the form field types
export type FormFieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date' | 'file';

// Define FormField to ensure it matches FormQuestion
export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  required: boolean;
  order: number;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  settings?: Record<string, any>;
}

// FormBuilderState
export interface FormBuilderState {
  currentForm: Form | null;
  isDirty: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

interface FormBuilderActions {
  setCurrentForm: (form: Form | null) => void;
  updateFormField: (field: string, value: any) => void;
  updateFormSettings: (settings: Partial<FormSettings>) => void;
  addQuestion: (question: Partial<FormField>) => void;
  updateQuestion: (id: string, updates: Partial<FormField>) => void;
  removeQuestion: (index: number) => void;
  moveQuestion: (fromIndex: number, toIndex: number) => void;
  updateQuestionField: (questionId: string, field: string, value: any) => void;
  updateQuestionOption: (questionId: string, optionIndex: number, field: string, value: string) => void;
  addQuestionOption: (questionId: string, option: { label: string; value: string }) => void;
  removeQuestionOption: (questionId: string, optionIndex: number) => void;
  resetFormBuilder: () => void;
  setIsDirty: (isDirty: boolean) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (field: string, message: string) => void;
  clearErrors: () => void;
}

const initialState: FormBuilderState = {
  currentForm: null,
  isDirty: false,
  isSubmitting: false,
  errors: {},
};

export const useFormBuilderStore = create<FormBuilderState & FormBuilderActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      setCurrentForm: (form) => set({ currentForm: form, isDirty: false }),
      
      updateFormField: (field, value) => {
        const { currentForm } = get();
        if (!currentForm) return;
        
        set({
          currentForm: {
            ...currentForm,
            [field]: value
          },
          isDirty: true
        });
      },
      
      updateFormSettings: (settings) => {
        const { currentForm } = get();
        if (!currentForm) return;
        
        const updatedSettings: FormSettings = {
          allowMultipleSubmissions: settings.allowMultipleSubmissions !== undefined 
            ? settings.allowMultipleSubmissions 
            : (currentForm.settings?.allowMultipleSubmissions || false),
          showProgressBar: settings.showProgressBar !== undefined 
            ? settings.showProgressBar 
            : (currentForm.settings?.showProgressBar || true),
          submitButtonText: settings.submitButtonText || currentForm.settings?.submitButtonText || 'Submit',
          successMessage: settings.successMessage || currentForm.settings?.successMessage || 'Form submitted successfully',
          redirectUrl: settings.redirectUrl || currentForm.settings?.redirectUrl,
          notificationEmails: settings.notificationEmails || currentForm.settings?.notificationEmails,
          autoSave: settings.autoSave !== undefined 
            ? settings.autoSave 
            : currentForm.settings?.autoSave
        };
        
        set({
          currentForm: {
            ...currentForm,
            settings: updatedSettings
          },
          isDirty: true
        });
      },
      
      addQuestion: (question) => {
        const { currentForm } = get();
        if (!currentForm) return;
        
        const newQuestion: FormField = {
          id: question.id || `q_${Math.random().toString(36).substring(2, 9)}`,
          type: question.type || 'text',
          label: question.label || 'New Question',
          required: question.required || false,
          order: currentForm.fields ? currentForm.fields.length : 0,
          options: question.options || [],
          placeholder: question.placeholder || '',
          defaultValue: question.defaultValue || '',
          validation: question.validation || {},
          settings: question.settings || {}
        };
        
        set({
          currentForm: {
            ...currentForm,
            fields: [...(currentForm.fields || []), newQuestion]
          },
          isDirty: true
        });
      },
      
      updateQuestion: (id, updates) => {
        const { currentForm } = get();
        if (!currentForm || !currentForm.fields) return;
        
        const questionIndex = currentForm.fields.findIndex(q => q.id === id);
        if (questionIndex === -1) return;
        
        const updatedQuestions = [...currentForm.fields];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          ...updates
        };
        
        set({
          currentForm: {
            ...currentForm,
            fields: updatedQuestions
          },
          isDirty: true
        });
      },
      
      removeQuestion: (index) => {
        const { currentForm } = get();
        if (!currentForm) return;
        
        const newQuestions = currentForm.fields.filter((_: any, i: number) => i !== index);
        // Update order for remaining questions
        newQuestions.forEach((q: any, i: number) => {
          q.order = i;
        });
        
        set({
          currentForm: {
            ...currentForm,
            fields: newQuestions
          },
          isDirty: true
        });
      },
      
      moveQuestion: (fromIndex, toIndex) => {
        const { currentForm } = get();
        if (!currentForm || !currentForm.fields) return;
        
        if (
          fromIndex < 0 ||
          fromIndex >= currentForm.fields.length ||
          toIndex < 0 ||
          toIndex >= currentForm.fields.length
        ) {
          return;
        }
        
        const newQuestions = [...currentForm.fields];
        const [movedItem] = newQuestions.splice(fromIndex, 1);
        newQuestions.splice(toIndex, 0, movedItem);
        
        // Update order for all questions
        newQuestions.forEach((question, index) => {
          question.order = index;
        });
        
        set({
          currentForm: {
            ...currentForm,
            fields: newQuestions
          },
          isDirty: true
        });
      },
      
      updateQuestionField: (questionId, field, value) => {
        const { currentForm } = get();
        if (!currentForm || !currentForm.fields) return;
        
        const questionIndex = currentForm.fields.findIndex(q => q.id === questionId);
        if (questionIndex === -1) return;
        
        const updatedQuestions = [...currentForm.fields];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          [field]: value
        };
        
        set({
          currentForm: {
            ...currentForm,
            fields: updatedQuestions
          },
          isDirty: true
        });
      },
      
      updateQuestionOption: (questionId, optionIndex, field, value) => {
        const { currentForm } = get();
        if (!currentForm || !currentForm.fields) return;
        
        const questionIndex = currentForm.fields.findIndex(q => q.id === questionId);
        if (questionIndex === -1) return;
        
        const question = currentForm.fields[questionIndex];
        if (!question.options) return;
        
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          [field]: value
        };
        
        const updatedQuestions = [...currentForm.fields];
        updatedQuestions[questionIndex] = {
          ...question,
          options: updatedOptions
        };
        
        set({
          currentForm: {
            ...currentForm,
            fields: updatedQuestions
          },
          isDirty: true
        });
      },
      
      addQuestionOption: (questionId, option) => {
        const { currentForm } = get();
        if (!currentForm || !currentForm.fields) return;
        
        const questionIndex = currentForm.fields.findIndex(q => q.id === questionId);
        if (questionIndex === -1) return;
        
        const question = currentForm.fields[questionIndex];
        const options = question.options || [];
        
        const updatedQuestions = [...currentForm.fields];
        updatedQuestions[questionIndex] = {
          ...question,
          options: [...options, option]
        };
        
        set({
          currentForm: {
            ...currentForm,
            fields: updatedQuestions
          },
          isDirty: true
        });
      },
      
      removeQuestionOption: (questionId, optionIndex) => {
        const { currentForm } = get();
        if (!currentForm || !currentForm.fields) return;
        
        const questionIndex = currentForm.fields.findIndex(q => q.id === questionId);
        if (questionIndex === -1) return;
        
        const question = currentForm.fields[questionIndex];
        if (!question.options) return;
        
        const updatedOptions = [...question.options];
        updatedOptions.splice(optionIndex, 1);
        
        const updatedQuestions = [...currentForm.fields];
        updatedQuestions[questionIndex] = {
          ...question,
          options: updatedOptions
        };
        
        set({
          currentForm: {
            ...currentForm,
            fields: updatedQuestions
          },
          isDirty: true
        });
      },
      
      resetFormBuilder: () => set(initialState),
      
      setIsDirty: (isDirty) => set({ isDirty }),
      
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
      
      setError: (field, message) => set(state => ({
        errors: {
          ...state.errors,
          [field]: message
        }
      })),
      
      clearErrors: () => set({ errors: {} })
    }),
    { name: 'form-builder-store' }
  )
);