// Metadatos para buscadores y redes sociales, generados desde el contenido del idioma actual.
// Los usan dos sitios: el plugin de compilación (HTML inicial, para quien no ejecuta JavaScript) y useSeo (al cambiar de idioma).

import { languages } from '../data/content'
import { images } from '../data/images'
import { site } from '../data/site'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

export function siteUrl() {
  return (site.seo.siteUrl || '').replace(/\/+$/, '')
}

function absolute(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  const base = siteUrl()
  return base ? `${base}/${path.replace(/^\/+/, '')}` : ''
}

// Imagen para compartir: la de site.seo.ogImage o, si no hay, la foto del hero recortada a 1200 × 630.
function shareImage(language) {
  const hero = images.hero
  const alt = typeof hero?.alt === 'string' ? hero.alt : (hero?.alt?.[language] ?? '')
  if (site.seo.ogImage) return { url: absolute(site.seo.ogImage), alt }

  const src = hero?.src ?? ''
  if (!/^https?:\/\//i.test(src)) return { url: absolute(src), alt }
  const url = new URL(src)
  if (url.hostname === 'images.unsplash.com') {
    url.searchParams.set('w', String(OG_WIDTH))
    url.searchParams.set('h', String(OG_HEIGHT))
    url.searchParams.set('fit', 'crop')
  }
  return { url: url.toString(), alt }
}

// Precio con el código de moneda («COP 380.000», «USD 120») para que no haya dudas en los datos estructurados.
function priceWithCode(amount, { locale, currency }) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay: 'code', maximumFractionDigits: 0 })
    .format(amount)
    .replace(/\s/g, ' ')
}

// Datos estructurados (schema.org). Solo incluyen lo que la página muestra: nombre, contacto, dirección, precios y servicios.
function structuredData(content, { canonical, image }) {
  const { hotel, location, rooms, services, booking, seo } = content
  const prices = rooms.map((room) => room.pricePerNight).filter(Number.isFinite)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const geo = site.seo.geo

  return {
    '@context': 'https://schema.org',
    '@type': site.seo.schemaType,
    name: hotel.name,
    description: seo.description,
    ...(canonical && { url: canonical }),
    ...(image.url && { image: image.url }),
    telephone: location.phone,
    email: location.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressCountry: location.countryCode,
    },
    ...(geo && { geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude } }),
    ...(prices.length > 0 && {
      priceRange: min === max ? priceWithCode(min, booking) : `${priceWithCode(min, booking)} - ${priceWithCode(max, booking)}`,
    }),
    ...(services.items.length > 0 && {
      amenityFeature: services.items.map((item) => ({ '@type': 'LocationFeatureSpecification', name: item.name, value: true })),
    }),
  }
}

// Lista de etiquetas del <head>: { tag, key, attrs, children }. `key` identifica cada una para actualizarla sin duplicarla.
// `page` es 'home' o 'request' (la página de reserva solo cambia el título).
export function seoTags(content, { page = 'home' } = {}) {
  const { hotel, request, meta, seo, language } = content
  const title = page === 'request' ? `${request.title} · ${hotel.name}` : seo.title
  const base = siteUrl()
  const canonical = base ? `${base}/` : ''
  const image = shareImage(language)
  const robots = site.seo.noindex ? 'noindex, nofollow' : 'index, follow'

  const meta_ = (key, attrs) => ({ tag: 'meta', key, attrs })
  const tags = [
    { tag: 'title', key: 'title', children: title },
    meta_('description', { name: 'description', content: seo.description }),
    meta_('robots', { name: 'robots', content: robots }),
    ...(canonical ? [{ tag: 'link', key: 'canonical', attrs: { rel: 'canonical', href: canonical } }] : []),

    meta_('og:type', { property: 'og:type', content: 'website' }),
    meta_('og:site_name', { property: 'og:site_name', content: hotel.name }),
    meta_('og:title', { property: 'og:title', content: title }),
    meta_('og:description', { property: 'og:description', content: seo.description }),
    meta_('og:locale', { property: 'og:locale', content: meta.ogLocale }),
    ...Object.values(languages)
      .filter((other) => other.meta.code !== language)
      .map((other) => meta_(`og:locale:alternate:${other.meta.code}`, { property: 'og:locale:alternate', content: other.meta.ogLocale })),
    ...(canonical ? [meta_('og:url', { property: 'og:url', content: canonical })] : []),

    meta_('twitter:card', { name: 'twitter:card', content: image.url ? 'summary_large_image' : 'summary' }),
    meta_('twitter:title', { name: 'twitter:title', content: title }),
    meta_('twitter:description', { name: 'twitter:description', content: seo.description }),
  ]

  if (image.url) {
    tags.push(
      meta_('og:image', { property: 'og:image', content: image.url }),
      meta_('og:image:width', { property: 'og:image:width', content: String(OG_WIDTH) }),
      meta_('og:image:height', { property: 'og:image:height', content: String(OG_HEIGHT) }),
      meta_('twitter:image', { name: 'twitter:image', content: image.url }),
    )
    if (image.alt) {
      tags.push(
        meta_('og:image:alt', { property: 'og:image:alt', content: image.alt }),
        meta_('twitter:image:alt', { name: 'twitter:image:alt', content: image.alt }),
      )
    }
  }

  // Se escapa «<» para que ningún texto pueda cerrar la etiqueta <script>.
  const json = JSON.stringify(structuredData(content, { canonical, image })).replace(/</g, '\\u003c')
  tags.push({ tag: 'script', key: 'jsonld', attrs: { type: 'application/ld+json' }, children: json })

  return tags
}

export function robotsTxt() {
  if (site.seo.noindex) return 'User-agent: *\nDisallow: /\n'
  const base = siteUrl()
  return `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`
}

// Mapa del sitio: una sola página (los idiomas y la reserva viven en la misma URL). Solo si hay siteUrl y se puede indexar.
export function sitemapXml(date = new Date()) {
  const base = siteUrl()
  if (!base || site.seo.noindex) return ''
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${base}/</loc>\n    <lastmod>${date.toISOString().slice(0, 10)}</lastmod>\n  </url>\n</urlset>\n`
}
