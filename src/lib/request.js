// Lógica de la página de solicitud de reserva: ruta, enlaces, validación y mensaje de correo.

import { booking, location, plurals, request, rooms, search as searchCopy } from '../data/content'
import { buildBookingUrl, fill, formatDate, formatPrice, plural, stayTotal, validateSearch } from './booking'

export const requestRoute = `/${request.id}`

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Enlace de los botones «Reservar»: página de solicitud propia o motor externo según booking.mode.
export function bookingHref({ checkIn, checkOut, guests, roomId } = {}) {
  if (booking.mode === 'external') return buildBookingUrl(booking, { checkIn, checkOut, guests, roomId })

  const query = new URLSearchParams()
  if (checkIn) query.set('checkIn', checkIn)
  if (checkOut) query.set('checkOut', checkOut)
  if (guests) query.set('guests', guests)
  if (roomId) query.set('room', roomId)
  const text = query.toString()
  return `#${requestRoute}${text ? `?${text}` : ''}`
}

// Valores iniciales del formulario: primero los de la URL y, si faltan, los del buscador de la portada.
export function initialRequest(params, fallback) {
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
export function validateRequest(values) {
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

export function errorMessage({ code, params }) {
  return fill(request.errors[code] ?? searchCopy.errors[code] ?? code, params)
}

export function requestRecipient() {
  return request.to || location.email
}

// Asunto y cuerpo del correo con los datos de la solicitud.
export function buildRequestMessage(values, room, stay) {
  const fields = {
    room: room.name,
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

export function mailtoHref({ subject, body }) {
  return `mailto:${requestRecipient()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, '\r\n'))}`
}
