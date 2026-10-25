import { useLanguage } from '../i18n/useLanguage'

// Selector de idioma (ES | EN). Se genera a partir de los idiomas registrados en data/content.js.
export default function LanguageSwitch({ className = '' }) {
  const { language, setLanguage, options, content } = useLanguage()
  if (options.length < 2) return null

  return (
    <div role="group" aria-label={content.languageLabel} className={`inline-flex rounded bg-sand ${className}`}>
      {options.map((option) => {
        const active = option.code === language
        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            aria-pressed={active}
            aria-label={option.name}
            title={option.name}
            onClick={() => setLanguage(option.code)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded px-3 text-base font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${active ? 'bg-ink text-paper' : 'can-hover:hover:bg-sand-strong'}`}
          >
            {option.short}
          </button>
        )
      })}
    </div>
  )
}
