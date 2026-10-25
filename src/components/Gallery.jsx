import { gallery } from '../data/content'
import { images } from '../data/images'
import Photo from './Photo'
import Reveal from './Reveal'

// Posición de cada foto en el mosaico de escritorio (12 columnas). Se repite si hay más fotos.
const mosaic = [
  'lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-8',
  'lg:col-span-4',
  'lg:col-span-4',
]

// Móvil y tableta: carrusel horizontal con scroll-snap. Escritorio: mosaico asimétrico.
export default function Gallery() {
  return (
    <section id={gallery.id} aria-labelledby="gallery-title" className="mx-auto mt-section max-w-page px-gutter">
      <Reveal as="h2" id="gallery-title" className="font-display text-section">
        {gallery.title}
      </Reveal>

      <ul className="-mx-gutter mt-10 flex snap-x snap-mandatory scroll-px-gutter gap-4 overflow-x-auto px-gutter pb-4 lg:mx-0 lg:mt-14 lg:grid lg:auto-rows-[17rem] lg:grid-flow-dense lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
        {gallery.items.map((item, index) => (
          <Reveal
            as="li"
            key={`${item.image}-${index}`}
            step={index % 3}
            className={`w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-auto ${mosaic[index % mosaic.length]}`}
          >
            <figure className="flex h-full flex-col">
              <Photo
                image={images[item.image]}
                label={item.caption}
                sizes="(min-width: 64rem) 50vw, 80vw"
                className="aspect-[4/5] lg:aspect-auto lg:min-h-0 lg:flex-1"
              />
              <figcaption className="mt-3 [overflow-wrap:anywhere]">{item.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
