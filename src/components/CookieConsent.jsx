import { useLayoutEffect, useRef, useState } from 'react'
import { useContent } from '../i18n/useLanguage'
import Button from './Button'
import Dialog from './Dialog'

function readConsent(storageKey) {
  try {
    const stored = window.localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function writeConsent(storageKey, value) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(value))
  } catch {
    // Sin almacenamiento disponible: la elección dura solo esta visita.
  }
}

function allCategories(cookies, accepted) {
  return Object.fromEntries(cookies.categories.map((category) => [category.id, category.required || accepted]))
}

function CookieSettingsForm({ initial, onSave }) {
  const { cookies } = useContent()
  const [choices, setChoices] = useState(initial)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSave(choices)
      }}
    >
      <p>{cookies.settingsIntro}</p>
      <ul className="mt-6 space-y-3">
        {cookies.categories.map((category) => (
          <li key={category.id} className="rounded bg-sand p-4">
            <label className="flex min-h-11 items-start gap-4">
              <input
                type="checkbox"
                checked={category.required || Boolean(choices[category.id])}
                disabled={category.required}
                onChange={(event) => setChoices({ ...choices, [category.id]: event.target.checked })}
                className="mt-1 h-6 w-6 shrink-0 accent-accent"
              />
              <span className="min-w-0">
                <span className="block font-semibold">
                  {category.label}
                  {category.required && ` · ${cookies.alwaysOn}`}
                </span>
                <span className="block">{category.description}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <Button type="submit" className="mt-8 w-full sm:w-auto">
        {cookies.save}
      </Button>
    </form>
  )
}

export default function CookieConsent({ settingsOpen, onSettingsOpenChange, onOpenPolicy }) {
  const { cookies, legal } = useContent()
  const [consent, setConsent] = useState(() => readConsent(cookies.storageKey))
  const bannerRef = useRef(null)
  const bannerVisible = !consent && !settingsOpen

  // Publica la altura del banner para que el botón de WhatsApp se coloque por encima mientras esté visible.
  // Antes del primer pintado, para que el botón de WhatsApp no «salte» al cargar la página.
  useLayoutEffect(() => {
    const root = document.documentElement
    const banner = bannerRef.current
    if (!bannerVisible || !banner) return
    const update = () => root.style.setProperty('--cookie-banner-height', `${banner.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(banner)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--cookie-banner-height')
    }
  }, [bannerVisible])

  function save(choices) {
    const value = { ...choices, necessary: true, date: new Date().toISOString() }
    writeConsent(cookies.storageKey, value)
    setConsent(value)
    onSettingsOpenChange(false)
  }

  return (
    <>
      {bannerVisible && (
        <div ref={bannerRef} role="region" aria-label={cookies.settingsTitle} className="fixed inset-x-0 bottom-0 z-40 bg-ink text-paper">
          <div className="mx-auto flex max-w-page flex-col gap-4 px-gutter py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <p className="max-w-3xl">
              {cookies.bannerText}{' '}
              <button type="button" onClick={onOpenPolicy} className="inline-flex min-h-11 items-center underline underline-offset-4">
                {cookies.policyLink}
              </button>
            </p>
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Button variant="light" onClick={() => save(allCategories(cookies, true))}>
                {cookies.acceptAll}
              </Button>
              <Button variant="light" onClick={() => save(allCategories(cookies, false))}>
                {cookies.rejectAll}
              </Button>
              <Button variant="primary" onClick={() => onSettingsOpenChange(true)} className="col-span-2 sm:col-span-1">
                {cookies.configure}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={settingsOpen}
        onClose={() => onSettingsOpenChange(false)}
        title={cookies.settingsTitle}
        closeLabel={legal.closeLabel}
      >
        {settingsOpen && <CookieSettingsForm initial={consent ?? allCategories(cookies, false)} onSave={save} />}
      </Dialog>
    </>
  )
}
