
"use client";

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

export type SupportedLanguage = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: Dispatch<SetStateAction<SupportedLanguage>>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en'); // Default to English

  useEffect(() => {
    const storedLanguage = localStorage.getItem('appLanguage') as SupportedLanguage | null;
    if (storedLanguage && ['en', 'fr', 'es'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: SupportedLanguage) => {
    localStorage.setItem('appLanguage', lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage as Dispatch<SetStateAction<SupportedLanguage>> }}>
      {children}
    </LanguageContext.Provider>
  );
}
