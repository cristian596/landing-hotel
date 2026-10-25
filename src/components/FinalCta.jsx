import { useContent } from '../i18n/useLanguage'
import Button from './Button'
import Reveal from './Reveal'

export default function FinalCta() {
  const { finalCta } = useContent()
  return (
    <section aria-labelledby="cta-title" className="mx-auto mt-section max-w-page px-gutter">
      <Reveal className="rounded bg-ink px-6 py-16 text-paper sm:px-12 lg:px-20 lg:py-24">
        <h2 id="cta-title" className="max-w-[18ch] text-balance font-display text-section">
          {finalCta.title}
        </h2>
        <p className="mt-6 max-w-xl text-lead">{finalCta.text}</p>
        <Button href={finalCta.cta.href} className="mt-10">
          {finalCta.cta.label}
        </Button>
      </Reveal>
    </section>
  )
}
