import { createContext } from 'react'

// Contexto del idioma: { language, setLanguage, options, content }. Lo rellena LanguageProvider.
export const LanguageContext = createContext(null)
