'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  language: 'ar' | 'fr';
  setLanguage: (lang: 'ar' | 'fr') => void;
  toggleLanguage: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  isResourceModalOpen: boolean;
  setIsResourceModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'ar' | 'fr'>('ar');
  const [darkMode, setDarkModeState] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('freelance_maroc_lang') as 'ar' | 'fr';
      if (savedLang === 'ar' || savedLang === 'fr') {
        setLanguageState(savedLang);
      }

      const savedTheme = localStorage.getItem('freelance_maroc_theme');
      if (savedTheme === 'dark') {
        setDarkModeState(true);
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        setDarkModeState(false);
        document.documentElement.classList.remove('dark');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkModeState(true);
        document.documentElement.classList.add('dark');
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: 'ar' | 'fr') => {
    setLanguageState(lang);
    try {
      localStorage.setItem('freelance_maroc_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'fr' : 'ar';
    setLanguage(nextLang);
  };

  const setDarkMode = (val: boolean) => {
    setDarkModeState(val);
    try {
      localStorage.setItem('freelance_maroc_theme', val ? 'dark' : 'light');
    } catch {
      // ignore
    }
    if (val) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        isResourceModalOpen,
        setIsResourceModalOpen,
      }}
    >
      <div 
        dir={language === 'ar' ? 'rtl' : 'ltr'} 
        className={`min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] text-slate-900 dark:text-zinc-100 transition-colors duration-300 ${
          language === 'ar' ? 'font-arabic' : 'font-latin'
        }`}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
