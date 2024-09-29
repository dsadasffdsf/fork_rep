import React, { createContext, useContext, useEffect, useState } from 'react';
import { translation } from './translations';

export const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LocalizationContext.Provider value={{ translation, language, setLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
