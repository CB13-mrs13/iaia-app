
"use client";

import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useCallback } from 'react';

export type SupportedLanguage = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (newLanguage: SupportedLanguage) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Runs only on the client after hydration
    const storedLanguage = localStorage.getItem('appLanguage') as SupportedLanguage | null;
    if (storedLanguage && ['en', 'fr', 'es'].includes(storedLanguage)) {
      setCurrentLanguageState(storedLanguage);
    }
  }, []); // Empty dependency array: runs once on client mount

  const handleSetLanguage = useCallback((newLanguage: SupportedLanguage) => {
    localStorage.setItem('appLanguage', newLanguage);
    setCurrentLanguageState(newLanguage);
  }, []); // Dependencies for useCallback: setCurrentLanguageState is stable

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
