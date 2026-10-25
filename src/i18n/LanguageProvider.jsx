import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildContent, languages } from '../data/content'
import { site } from '../data/site'
import { LanguageContext } from './context'

const options = Object.values(languages).map((language) => language.meta)

function isAvailable(code) {
  return typeof code === 'string' && Object.hasOwn(languages, code)
}

// Orden de preferencia: idioma elegido antes, idioma del navegador y, si no está disponible, el de site.defaultLanguage.
function initialLanguage() {
  try {
    const stored = window.localStorage.getItem(site.languageStorageKey)
    if (isAvailable(stored)) return stored
  } catch {
    // Sin almacenamiento disponible: se sigue con el idioma del navegador.
  }
  const browser = (window.navigator.language || '').slice(0, 2).toLowerCase()
  return isAvailable(browser) ? browser : site.defaultLanguage
}

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(initialLanguage)
  const content = useMemo(() => buildContent(language), [language])

  const setLanguage = useCallback((code) => {
    if (!isAvailable(code)) return
    setLanguageState(code)
    try {
      window.localStorage.setItem(site.languageStorageKey, code)
    } catch {
      // Sin almacenamiento disponible: el idioma dura solo esta visita.
    }
  }, [])

  // El atributo lang del documento lo usan lectores de pantalla, traductores y buscadores.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, options, content }), [language, setLanguage, content])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
