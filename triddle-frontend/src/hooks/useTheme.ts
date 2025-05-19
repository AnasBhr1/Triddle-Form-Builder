import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
      return savedTheme;
    }
    return 'system';
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  }, [theme, systemTheme]);

  const toggleTheme = () => {
    const currentEffectiveTheme = getCurrentTheme();
    setTheme(currentEffectiveTheme === 'dark' ? 'light' : 'dark');
  };

  const setThemePreference = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const getCurrentTheme = (): 'light' | 'dark' => {
    return theme === 'system' ? systemTheme : theme;
  };

  return { theme, setTheme: setThemePreference, toggleTheme, currentTheme: getCurrentTheme() };
};