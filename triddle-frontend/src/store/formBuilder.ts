import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Form, FormQuestion, FormSettings, FormBuilderState } from '../types';

interface FormBuilderActions {
  setCurrentForm: (form: Form | null) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setDirty: (isDirty: boolean) => void;
  addQuestion: (question: FormQuestion) => void;
  updateQuestion: (index: number, question: FormQuestion) => void;
  deleteQuestion: (index: number) => void;
  moveQuestion: (fromIndex: number, toIndex: number) => void;
  updateFormSettings: (settings: Partial<FormSettings>) => void;
  updateFormTitle: (title: string) => void;
  updateFormDescription: (description: string) => void;
  autoSave: () => void;
  reset: () => void;
}

type FormBuilderStore = FormBuilderState & FormBuilderActions;

export const useFormBuilderStore = create<FormBuilderStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentForm: null,
      currentQuestionIndex: 0,
      isPreviewMode: false,
      isDirty: false,
      lastSaved: undefined,

      // Actions
      setCurrentForm: (form: Form | null) => {
        set({
          currentForm: form,
          currentQuestionIndex: 0,
          isDirty: false,
          lastSaved: form ? new Date() : undefined,
        });
      },

      setCurrentQuestionIndex: (index: number) => {
        set({ currentQuestionIndex: index });
      },

      setPreviewMode: (isPreview: boolean) => {
        set({ isPreviewMode: isPreview });
      },

      setDirty: (isDirty: boolean) => {
        set({ isDirty });
      },

      addQuestion: (question: FormQuestion) => {
        const { currentForm } = get();
        if (!currentForm) return;

        const newQuestions = [...currentForm.questions, question];
        set({
          currentForm: {
            ...currentForm,
            questions: newQuestions,
          },
          isDirty: true,
        });
      },

      updateQuestion: (index: number, question: FormQuestion) => {
        const { currentForm } = get();
        if (!currentForm) return;

        const newQuestions = [...currentForm.questions];
        newQuestions[index] = question;

        set({
          currentForm: {
            ...currentForm,
            questions: newQuestions,
          },
          isDirty: true,
        });
      },

      deleteQuestion: (index: number) => {
        const { currentForm } = get();
        if (!currentForm) return;

        const newQuestions = currentForm.questions.filter((_, i) => i !== index);
        // Update order for remaining questions
        newQuestions.forEach((q, i) => {
          q.order = i;
        });

        set({
          currentForm: {
            ...currentForm,
            questions: newQuestions,
          },
          isDirty: true,
          currentQuestionIndex: Math.min(index, newQuestions.length - 1),
        });
      },

      moveQuestion: (fromIndex: number, toIndex: number) => {
        const { currentForm } = get();
        if (!currentForm) return;

        const newQuestions = [...currentForm.questions];
        const movedQuestion = newQuestions.splice(fromIndex, 1)[0];
        newQuestions.splice(toIndex, 0, movedQuestion);

        // Update order for all questions
        newQuestions.forEach((q, i) => {
          q.order = i;
        });

        set({
          currentForm: {
            ...currentForm,
            questions: newQuestions,
          },
          isDirty: true,
          currentQuestionIndex: toIndex,
        });
      },

      updateFormSettings: (settings: Partial<FormSettings>) => {
        const { currentForm } = get();
        if (!currentForm) return;

        set({
          currentForm: {
            ...currentForm,
            settings: {
              ...currentForm.settings,
              ...settings,
            },
          },
          isDirty: true,
        });
      },

      updateFormTitle: (title: string) => {
        const { currentForm } = get();
        if (!currentForm) return;

        set({
          currentForm: {
            ...currentForm,
            title,
          },
          isDirty: true,
        });
      },

      updateFormDescription: (description: string) => {
        const { currentForm } = get();
        if (!currentForm) return;

        set({
          currentForm: {
            ...currentForm,
            description,
          },
          isDirty: true,
        });
      },

      autoSave: () => {
        // This would trigger auto-save functionality
        set({
          lastSaved: new Date(),
          isDirty: false,
        });
      },

      reset: () => {
        set({
          currentForm: null,
          currentQuestionIndex: 0,
          isPreviewMode: false,
          isDirty: false,
          lastSaved: undefined,
        });
      },
    }),
    {
      name: 'form-builder-store',
    }
  )
);