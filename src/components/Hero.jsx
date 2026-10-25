import { images } from '../data/images'
import Button from './Button'
import Photo from './Photo'
import Reveal from './Reveal'
import { useContent } from '../i18n/useLanguage'

// Móvil: texto arriba y foto alta debajo. Escritorio: foto grande con el texto en un bloque recortado abajo a la izquierda.
export default function Hero() {
  const { hero, hotel } = useContent()
  return (
    <section id={hero.id} aria-labelledby="hero-title" className="mx-auto max-w-page px-gutter">
      <div className="flex flex-col lg:relative lg:min-h-[86vh] lg:justify-end">
        <Photo
          image={images.hero}
          label={hotel.name}
          priority
          sizes="(min-width: 90rem) 90rem, 100vw"
          className="order-2 h-[52vh] min-h-[20rem] lg:absolute lg:inset-0 lg:order-none lg:h-auto"
          imgClassName="animate-hero-zoom motion-reduce:animate-none"
        />
        <div className="order-1 pb-8 pt-6 lg:relative lg:max-w-[46rem] lg:bg-paper lg:pb-0 lg:pr-14 lg:pt-14">
          <Reveal as="h1" id="hero-title" className="text-balance font-display text-display">
            {hero.title}
          </Reveal>
          <Reveal as="p" step={1} className="mt-5 max-w-[38ch] text-lead">
            {hero.subtitle}
          </Reveal>
          <Reveal step={2} className="mt-8">
            <Button href={hero.cta.href}>{hero.cta.label}</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
