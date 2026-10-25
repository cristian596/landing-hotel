import { useId } from 'react'
import { useContent } from '../i18n/useLanguage'
import { addDays, fill, formatPrice, plural, quoteRoom, todayISO } from '../lib/booking'
import { bookingHref } from '../lib/request'
import Button from './Button'
import Reveal from './Reveal'

const fieldClass =
  'mt-2 min-h-12 w-full min-w-0 appearance-none rounded bg-paper px-4 text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const stepperClass =
  'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded bg-paper text-lead font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:active:scale-100 motion-reduce:transition-none motion-reduce:active:transform-none'

export default function BookingSearch({ search, onSearchChange, quote }) {
  const content = useContent()
  const { booking, location, plurals, rooms, roomsSection, search: copy } = content
  const ids = useId()
  const today = todayISO()
  const guests = Number(search.guests)
  const money = (amount) => formatPrice(amount, booking)

  const update = (field) => (event) => onSearchChange({ ...search, [field]: event.target.value })
  const stepGuests = (delta) => {
    const current = Number.isInteger(guests) ? guests : booking.minGuests
    const next = Math.min(booking.maxGuests, Math.max(booking.minGuests, current + delta))
    onSearchChange({ ...search, guests: String(next) })
  }

  const errorMessages = quote.errors.map((error) => fill(copy.errors[error.code], error.params))

  return (
    <section id={copy.id} aria-labelledby={`${ids}-title`} className="mx-auto mt-section max-w-page px-gutter">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal as="h2" id={`${ids}-title`} className="font-display text-section">
            {copy.title}
          </Reveal>
          <Reveal as="p" step={1} className="mt-5 max-w-prose">
            {copy.intro}
          </Reveal>

          <Reveal as="form" step={2} noValidate onSubmit={(event) => event.preventDefault()} className="mt-8 rounded bg-sand-strong p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label className="block min-w-0 font-semibold">
                {copy.checkInLabel}
                <input
                  type="date"
                  value={search.checkIn}
                  min={today}
                  onChange={update('checkIn')}
                  aria-invalid={quote.errors.some((e) => e.code === 'pastCheckIn' || e.code === 'missingDates')}
                  className={fieldClass}
                />
              </label>
              <label className="block min-w-0 font-semibold">
                {copy.checkOutLabel}
                <input
                  type="date"
                  value={search.checkOut}
                  min={search.checkIn ? addDays(search.checkIn, 1) : today}
                  onChange={update('checkOut')}
                  aria-invalid={quote.errors.some((e) => e.code === 'checkOutBeforeCheckIn' || e.code === 'missingDates')}
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="mt-5">
              <label htmlFor={`${ids}-guests`} className="font-semibold">
                {copy.guestsLabel}
              </label>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label={copy.decreaseGuests}
                  disabled={guests <= booking.minGuests}
                  onClick={() => stepGuests(-1)}
                  className={stepperClass}
                >
                  −
                </button>
                <input
                  id={`${ids}-guests`}
                  type="number"
                  inputMode="numeric"
                  min={booking.minGuests}
                  max={booking.maxGuests}
                  value={search.guests}
                  onChange={update('guests')}
                  aria-invalid={quote.errors.some((e) => e.code === 'guestsRange')}
                  className="min-h-12 w-20 min-w-0 rounded bg-paper px-2 text-center text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
                <button
                  type="button"
                  aria-label={copy.increaseGuests}
                  disabled={guests >= booking.maxGuests}
                  onClick={() => stepGuests(1)}
                  className={stepperClass}
                >
                  +
                </button>
              </div>
            </div>

            <div aria-live="polite" className="mt-6">
              {quote.valid ? (
                <p className="font-semibold">
                  {fill(copy.summary, {
                    nights: plural(plurals.night, quote.nights, booking.locale),
                    guests: plural(plurals.guest, quote.guests, booking.locale),
                  })}
                </p>
              ) : (
                <ul className="space-y-1 font-semibold text-accent-strong">
                  {errorMessages.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="text-lead font-semibold">{copy.resultsTitle}</h3>
          {rooms.length === 0 ? (
            <div className="mt-6 rounded bg-sand p-6">
              <p className="font-semibold">{roomsSection.empty.title}</p>
              <p className="mt-2">{roomsSection.empty.text}</p>
              <Button href={`mailto:${location.email}`} variant="dark" className="mt-5">
                {roomsSection.empty.cta}
              </Button>
            </div>
          ) : (
            <>
              <ul className="mt-6 space-y-3">
                {rooms.map((room) => {
                  const roomQuote = quoteRoom(room, quote)
                  return (
                    <li key={room.id} className="flex flex-col gap-5 rounded bg-sand p-6 sm:flex-row sm:items-end sm:justify-between">
                      <div className="min-w-0">
                        <h4 className="font-display text-title [overflow-wrap:anywhere]">{room.name}</h4>
                        <p className="mt-1">
                          {quote.valid
                            ? fill(copy.nightsTimesPrice, {
                                nights: plural(plurals.night, quote.nights, booking.locale),
                                price: money(room.pricePerNight),
                              })
                            : fill(copy.perNight, { price: money(room.pricePerNight) })}
                        </p>
                        {roomQuote.overCapacity && (
                          <p className="mt-1 font-semibold text-accent-strong">
                            {fill(copy.overCapacity, { guests: plural(plurals.guest, room.capacity, booking.locale) })}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3 sm:flex-col sm:items-end">
                        {roomQuote.bookable && (
                          <p className="font-display text-title">
                            <span className="sr-only">{copy.totalLabel} </span>
                            {money(roomQuote.total)}
                          </p>
                        )}
                        <Button
                          href={
                            roomQuote.bookable
                              ? bookingHref(content, { ...search, roomId: room.id })
                              : undefined
                          }
                          disabled={!roomQuote.bookable}
                          aria-label={fill(copy.bookRoomLabel, { room: room.name })}
                        >
                          {roomQuote.overCapacity ? copy.unavailableLabel : copy.bookLabel}
                        </Button>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-4">{quote.valid ? copy.taxNote : copy.fixToSee}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
