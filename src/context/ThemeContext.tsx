'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Get theme from localStorage or system preference on mount
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Update state
    setTheme(initialTheme);

    // Apply theme to document element
    updateDocumentTheme(initialTheme);
  }, []);

  // Update document when theme changes
  useEffect(() => {
    updateDocumentTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function updateDocumentTheme(theme: Theme) {
  const htmlElement = document.documentElement;

  // Add transition class for smooth color transitions
  if (!htmlElement.classList.contains('theme-transitioning')) {
    htmlElement.classList.add('theme-transitioning');
  }

  if (theme === 'dark') {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  // Remove transition class after animation completes
  setTimeout(() => {
    htmlElement.classList.remove('theme-transitioning');
  }, 300);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
