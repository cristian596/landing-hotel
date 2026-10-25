import { useEffect } from 'react'
import { seoTags } from '../lib/seo'
import { useContent } from './useLanguage'

function upsert({ tag, key, attrs = {}, children }) {
  let element = document.head.querySelector(`[data-seo="${key}"]`)
  if (!element) {
    element = document.createElement(tag)
    element.dataset.seo = key
    document.head.appendChild(element)
  }
  for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value)
  if (children !== undefined && element.textContent !== children) element.textContent = children
}

// Mantiene el <head> (título, descripción, vista previa y datos estructurados) en el idioma actual.
// El HTML inicial ya los trae en el idioma por defecto: lo inyecta el plugin de compilación (seo-plugin.js).
export function useSeo(page = 'home') {
  const content = useContent()

  useEffect(() => {
    const tags = seoTags(content, { page })
    const keys = new Set(tags.map((tag) => tag.key))
    tags.forEach(upsert)
    document.head.querySelectorAll('[data-seo]').forEach((element) => {
      if (!keys.has(element.dataset.seo)) element.remove()
    })
  }, [content, page])
}
