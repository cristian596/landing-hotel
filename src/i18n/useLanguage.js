import { useContext } from 'react'
import { LanguageContext } from './context'

// Idioma actual y funciones para cambiarlo. `options` es la lista de idiomas para el selector.
export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  return value
}

// Contenido (textos, precios, contacto…) en el idioma actual.
export function useContent() {
  return useLanguage().content
}
