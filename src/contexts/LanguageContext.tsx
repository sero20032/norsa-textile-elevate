import React, { createContext, useContext, useState, useCallback } from "react";

type Language = "fi" | "en";

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (fi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("fi");

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "fi" ? "en" : "fi"));
  }, []);

  const t = useCallback(
    (fi: string, en: string) => (lang === "fi" ? fi : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
