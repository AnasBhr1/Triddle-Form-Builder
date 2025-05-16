import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        isDarkMode: false,

        toggleDarkMode: () => {
          set((state) => {
            const newDarkMode = !state.isDarkMode;
            // Update HTML class for Tailwind dark mode
            if (newDarkMode) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            return { isDarkMode: newDarkMode };
          });
        },

        setDarkMode: (isDark: boolean) => {
          set({ isDarkMode: isDark });
          // Update HTML class for Tailwind dark mode
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        },
      }),
      {
        name: 'theme-storage',
        onRehydrateStorage: () => (state) => {
          // Apply theme on app load
          if (state?.isDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        },
      }
    ),
    {
      name: 'theme-store',
    }
  )
);