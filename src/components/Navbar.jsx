import { useEffect, useState } from 'react'
import { hero, hotel, nav } from '../data/content'
import Button from './Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="relative z-30 bg-paper">
      <nav
        aria-label={nav.label}
        className="mx-auto flex max-w-page items-center justify-between gap-6 px-gutter py-4 lg:py-6"
      >
        <a href={`#${hero.id}`} className="min-w-0 py-2 font-display text-base [overflow-wrap:anywhere] sm:text-lead">
          {hotel.name}
        </a>

        <ul className="hidden shrink-0 items-center gap-8 lg:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="inline-flex min-h-11 items-center font-semibold can-hover:hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <Button href={nav.cta.href} className="hidden sm:inline-flex">
            {nav.cta.label}
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded bg-sand px-4 font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:active:transform-none lg:hidden"
          >
            {open ? nav.menuClose : nav.menuOpen}
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        inert={!open}
        className={`absolute inset-x-0 top-full origin-top bg-sand px-gutter pb-8 pt-4 transition-[transform,opacity] duration-200 ease-out-strong motion-reduce:transform-none motion-reduce:transition-none lg:hidden ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
      >
        <ul>
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close} className="flex min-h-12 items-center text-lead font-semibold">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button href={nav.cta.href} onClick={close} className="mt-6 w-full sm:hidden">
          {nav.cta.label}
        </Button>
      </div>
    </header>
  )
}
