// Lógica de la página de solicitud de reserva: ruta, enlaces, validación y mensaje de correo.
// Las funciones reciben `content`: el contenido del idioma actual (useContent()).

import {
  buildBookingUrl,
  fill,
  formatDate,
  formatPrice,
  nightsBetween,
  plural,
  stayTotal,
  validateSearch,
} from './booking'

// Ruta de la página de solicitud (en el hash de la URL). Es la misma en todos los idiomas.
export const requestRoute = '/reserva'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Enlace de los botones «Reservar»: página de solicitud propia o motor externo según booking.mode.
export function bookingHref(content, { checkIn, checkOut, guests, roomId } = {}) {
  const { booking, language, rooms } = content
  if (booking.mode === 'external') {
    // Además de las fechas, se envía el precio por noche y el total de la estancia (en la moneda del idioma).
    const room = rooms.find((item) => item.id === roomId)
    const nights = nightsBetween(checkIn, checkOut)
    const priced = Boolean(room) && nights > 0
    return buildBookingUrl(booking, {
      checkIn,
      checkOut,
      guests,
      roomId,
      language,
      currency: booking.currency,
      price: priced ? room.pricePerNight : undefined,
      total: priced ? stayTotal(room.pricePerNight, nights) : undefined,
    })
  }

  const query = new URLSearchParams()
  if (checkIn) query.set('checkIn', checkIn)
  if (checkOut) query.set('checkOut', checkOut)
  if (guests) query.set('guests', guests)
  if (roomId) query.set('room', roomId)
  const text = query.toString()
  return `#${requestRoute}${text ? `?${text}` : ''}`
}

// Valores iniciales del formulario: primero los de la URL y, si faltan, los del buscador de la portada.
export function initialRequest({ rooms }, params, fallback) {
  const roomId = params.get('room')
  return {
    checkIn: params.get('checkIn') ?? fallback.checkIn,
    checkOut: params.get('checkOut') ?? fallback.checkOut,
    guests: params.get('guests') ?? fallback.guests,
    roomId: rooms.some((room) => room.id === roomId) ? roomId : (rooms[0]?.id ?? ''),
    name: '',
    email: '',
    phone: '',
    notes: '',
    consent: false,
  }
}

const STAY_FIELD = {
  guestsRange: 'guests',
  missingDates: 'checkIn',
  pastCheckIn: 'checkIn',
  checkOutBeforeCheckIn: 'checkOut',
}

// Devuelve { valid, stay, room, errors }, donde errors es una lista de { field, code, params }.
export function validateRequest({ booking, plurals, rooms }, values) {
  const stay = validateSearch(values, booking)
  const room = rooms.find((item) => item.id === values.roomId)
  const errors = stay.errors.map((error) => ({ ...error, field: STAY_FIELD[error.code] }))

  if (!room) {
    errors.push({ field: 'room', code: 'roomRequired' })
  } else if (stay.valid && stay.guests > room.capacity) {
    errors.push({
      field: 'room',
      code: 'overCapacity',
      params: { guests: plural(plurals.guest, room.capacity, booking.locale) },
    })
  }
  if (!values.name.trim()) errors.push({ field: 'name', code: 'nameRequired' })
  if (!EMAIL.test(values.email.trim())) errors.push({ field: 'email', code: 'emailInvalid' })
  if (!values.consent) errors.push({ field: 'consent', code: 'consentRequired' })

  return { valid: errors.length === 0, stay, room, errors }
}

export function errorMessage({ request, search }, { code, params }) {
  return fill(request.errors[code] ?? search.errors[code] ?? code, params)
}

export function requestRecipient({ request, location }) {
  return request.to || location.email
}

// Número de WhatsApp del hotel, solo con dígitos. Vacío si no hay.
export function whatsappNumber({ whatsapp }) {
  return (whatsapp.number ?? '').replace(/\D/g, '')
}

// Formas de enviar la solicitud que se ofrecen: 'email' y/o 'whatsapp' (WhatsApp solo si hay número).
export function requestChannels(content) {
  const available = content.request.channels.filter(
    (channel) => channel === 'email' || (channel === 'whatsapp' && whatsappNumber(content)),
  )
  return available.length > 0 ? available : ['email']
}

// Asunto y cuerpo del correo con los datos de la solicitud, en el idioma actual.
export function buildRequestMessage({ booking, plurals, request, search }, values, room, stay) {
  const fields = {
    room: room.name,
    rate: fill(search.perNight, { price: formatPrice(room.pricePerNight, booking) }),
    checkIn: formatDate(values.checkIn, booking.locale),
    checkOut: formatDate(values.checkOut, booking.locale),
    nights: plural(plurals.night, stay.nights, booking.locale),
    guests: plural(plurals.guest, stay.guests, booking.locale),
    total: formatPrice(stayTotal(room.pricePerNight, stay.nights), booking),
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || '—',
    notes: values.notes.trim() || '—',
  }
  return {
    subject: fill(request.email.subject, fields),
    body: request.email.body.map((line) => fill(line, fields)).join('\n'),
  }
}

export function whatsappHref(content, { body }) {
  return `https://wa.me/${whatsappNumber(content)}?text=${encodeURIComponent(body)}`
}

export function mailtoHref(content, { subject, body }) {
  return `mailto:${requestRecipient(content)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, '\r\n'))}`
}
