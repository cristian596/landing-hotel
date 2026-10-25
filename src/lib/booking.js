// Lógica del buscador: fechas, noches, validación, precios y enlace de reserva.
// Las fechas se manejan como texto ISO (AAAA-MM-DD), igual que los <input type="date">.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const DAY_MS = 24 * 60 * 60 * 1000

function toUTC(iso) {
  if (!ISO_DATE.test(iso ?? '')) return null
  const [y, m, d] = iso.split('-').map(Number)
  const time = Date.UTC(y, m - 1, d)
  return Number.isNaN(time) ? null : time
}

export function todayISO() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function addDays(iso, days) {
  const time = toUTC(iso)
  if (time === null) return ''
  return new Date(time + days * DAY_MS).toISOString().slice(0, 10)
}

// Fecha larga en el idioma de `locale` (por ejemplo «3 de noviembre de 2026»).
export function formatDate(iso, locale) {
  const time = toUTC(iso)
  if (time === null) return ''
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(time)
}

export function nightsBetween(checkIn, checkOut) {
  const start = toUTC(checkIn)
  const end = toUTC(checkOut)
  if (start === null || end === null) return 0
  return Math.round((end - start) / DAY_MS)
}

// Devuelve { valid, nights, guests, errors }, donde errors es una lista de { code, params }.
export function validateSearch({ checkIn, checkOut, guests }, { minGuests, maxGuests }) {
  const errors = []
  const guestCount = Number(guests)
  const nights = nightsBetween(checkIn, checkOut)

  if (!Number.isInteger(guestCount) || guestCount < minGuests || guestCount > maxGuests) {
    errors.push({ code: 'guestsRange', params: { min: minGuests, max: maxGuests } })
  }

  if (toUTC(checkIn) === null || toUTC(checkOut) === null) {
    errors.push({ code: 'missingDates' })
  } else {
    if (toUTC(checkIn) < toUTC(todayISO())) errors.push({ code: 'pastCheckIn' })
    if (nights < 1) errors.push({ code: 'checkOutBeforeCheckIn' })
  }

  return { valid: errors.length === 0, nights: Math.max(nights, 0), guests: guestCount, errors }
}

export function stayTotal(pricePerNight, nights) {
  return Math.round(pricePerNight * nights * 100) / 100
}

// Estado de una habitación para la búsqueda actual.
export function quoteRoom(room, quote) {
  const overCapacity = quote.valid && quote.guests > room.capacity
  return {
    overCapacity,
    bookable: quote.valid && !overCapacity,
    total: quote.valid ? stayTotal(room.pricePerNight, quote.nights) : null,
  }
}

export function formatPrice(amount, { locale, currency }) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Reemplaza {clave} por su valor en una plantilla de texto.
export function fill(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match))
}

// Elige la forma singular o plural de content.plurals según el idioma.
export function plural(forms, count, locale) {
  const rule = new Intl.PluralRules(locale).select(count)
  const template = forms[rule] ?? forms.other
  return fill(template, { count: new Intl.NumberFormat(locale).format(count) })
}

export function buildBookingUrl(booking, { checkIn, checkOut, guests, roomId, language, currency, price, total } = {}) {
  if (!booking.params) return booking.url

  let url
  try {
    url = new URL(booking.url)
  } catch {
    return booking.url
  }

  const values = { checkIn, checkOut, guests, room: roomId, language, currency, price, total }
  for (const [key, param] of Object.entries(booking.params)) {
    if (param && values[key] !== undefined && values[key] !== '') url.searchParams.set(param, values[key])
  }
  return url.toString()
}
