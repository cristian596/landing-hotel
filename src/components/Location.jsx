import { images } from '../data/images'
import { useContent } from '../i18n/useLanguage'
import Button from './Button'
import Photo from './Photo'
import Reveal from './Reveal'

export default function Location() {
  const { location } = useContent()
  return (
    <section id={location.id} aria-labelledby="location-title" className="mx-auto mt-section max-w-page px-gutter">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <Photo
            image={images[location.image]}
            label={location.title}
            sizes="(min-width: 64rem) 45vw, 100vw"
            className="aspect-[4/3] lg:aspect-[4/5]"
          />
        </Reveal>

        <Reveal step={1} className="min-w-0 lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <h2 id="location-title" className="font-display text-section">
            {location.title}
          </h2>
          <p className="mt-5">{location.text}</p>
          <address className="mt-8 text-lead not-italic [overflow-wrap:anywhere]">
            {location.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <dl className="mt-8 space-y-3">
            <div>
              <dt className="font-semibold">{location.phoneLabel}</dt>
              <dd>
                <a href={`tel:${location.phone.replace(/[^\d+]/g, '')}`} className="inline-flex min-h-11 items-center underline underline-offset-4 transition-colors duration-150 can-hover:hover:text-accent">
                  {location.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{location.emailLabel}</dt>
              <dd className="[overflow-wrap:anywhere]">
                <a href={`mailto:${location.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4 transition-colors duration-150 can-hover:hover:text-accent">
                  {location.email}
                </a>
              </dd>
            </div>
          </dl>
          <Button href={location.mapsUrl} target="_blank" rel="noopener noreferrer" variant="dark" className="mt-8">
            {location.mapsLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
