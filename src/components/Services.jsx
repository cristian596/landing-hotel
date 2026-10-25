import { services } from '../data/content'
import Reveal from './Reveal'

export default function Services() {
  return (
    <section id={services.id} aria-labelledby="services-title" className="mx-auto mt-section max-w-page px-gutter">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal as="h2" id="services-title" className="font-display text-section">
            {services.title}
          </Reveal>
          <Reveal as="p" step={1} className="mt-5 text-lead">
            {services.intro}
          </Reveal>
        </div>

        <Reveal as="dl" step={2} className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:pt-3">
          {services.items.map((item) => (
            <div key={item.name} className="min-w-0">
              <dt className="font-display text-lead [overflow-wrap:anywhere]">{item.name}</dt>
              <dd className="mt-2">{item.description}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
