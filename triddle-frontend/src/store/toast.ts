import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => 
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: Math.random().toString(36).substring(2, 9),
          duration: 5000,
          ...toast
        }
      ]
    })),
  removeToast: (id) => 
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    })),
  clearToasts: () => set({ toasts: [] })
}));

// Helper function to easily show toasts
export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    useToastStore.getState().addToast({ 
      title, 
      message, 
      type: 'success', 
      duration 
    });
  },
  error: (title: string, message?: string, duration?: number) => {
    useToastStore.getState().addToast({ 
      title, 
      message, 
      type: 'error', 
      duration 
    });
  },
  warning: (title: string, message?: string, duration?: number) => {
    useToastStore.getState().addToast({ 
      title, 
      message, 
      type: 'warning', 
      duration 
    });
  },
  info: (title: string, message?: string, duration?: number) => {
    useToastStore.getState().addToast({ 
      title, 
      message, 
      type: 'info', 
      duration 
    });
  }
};

// Export UserRole (since it was shown as an existing export in the error messages)
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}