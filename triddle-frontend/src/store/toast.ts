import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Toast } from '../types';

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>()(
  devtools(
    (set) => ({
      toasts: [],

      addToast: (toast) => {
        const id = crypto.randomUUID();
        const newToast: Toast = {
          ...toast,
          id,
          duration: toast.duration || 5000,
        };

        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto-remove toast after duration
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
        }, newToast.duration);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      clearToasts: () => {
        set({ toasts: [] });
      },
    }),
    {
      name: 'toast-store',
    }
  )
);

// Helper functions for common toast types
export const toast = {
  success: (title: string, message: string) =>
    useToastStore.getState().addToast({
      type: 'success',
      title,
      message,
    }),

  error: (title: string, message: string) =>
    useToastStore.getState().addToast({
      type: 'error',
      title,
      message,
    }),

  warning: (title: string, message: string) =>
    useToastStore.getState().addToast({
      type: 'warning',
      title,
      message,
    }),

  info: (title: string, message: string) =>
    useToastStore.getState().addToast({
      type: 'info',
      title,
      message,
    }),
};