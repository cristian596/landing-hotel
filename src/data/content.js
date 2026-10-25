// Punto único de acceso al contenido: une los datos compartidos (site.js) con los textos de cada idioma.
// Para añadir un idioma: crea content.xx.js (copia content.es.js), regístralo en `languages` y añade el precio de
// cada habitación en su moneda en site.js.

import en from './content.en'
import es from './content.es'
import { site } from './site'

// El orden de este objeto es el del selector de idioma.
export const languages = { es, en }

export function buildContent(code) {
  const text = languages[code] ?? languages[site.defaultLanguage]
  const { locale, currency } = text.meta

  return {
    ...text,
    language: text.meta.code,
    languageLabel: text.language.switchLabel,
    hotel: { ...site.hotel, ...text.hotel },
    booking: { ...site.booking, locale, currency },
    rooms: site.rooms.map((room) => {
      const copy = text.rooms.find((item) => item.id === room.id)
      return { ...room, ...copy, pricePerNight: room.price[currency] }
    }),
    location: {
      ...site.location,
      address: [site.location.street, `${site.location.postalCode} ${site.location.city}`.trim(), site.location.country],
      ...text.location,
    },
    whatsapp: { ...site.whatsapp, ...text.whatsapp },
    request: { ...site.request, ...text.request },
    cookies: { ...site.cookies, ...text.cookies },
  }
}
