import { create } from 'zustand';
import { User } from '../types';

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // Added the missing property
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false, // Initialize with false
  isLoading: true,
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setInitialized: (isInitialized) => set({ isInitialized }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false })
}));