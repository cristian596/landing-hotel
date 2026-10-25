import { useEffect, useId, useRef, useState } from 'react'
import { useContent } from '../i18n/useLanguage'
import { addDays, fill, formatDate, formatPrice, plural, stayTotal, todayISO } from '../lib/booking'
import {
  buildRequestMessage,
  errorMessage,
  initialRequest,
  mailtoHref,
  requestChannels,
  requestRecipient,
  validateRequest,
  whatsappHref,
} from '../lib/request'
import Button from './Button'

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
const fieldClass = `mt-2 min-h-12 w-full min-w-0 appearance-none rounded bg-paper px-4 text-base text-ink ${focusRing}`

function Field({ id, label, hint, error, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 font-semibold text-accent-strong">
          {error}
        </p>
      )}
    </div>
  )
}

function Summary({ values, check }) {
  const { booking, plurals, request, search: copy } = useContent()
  const { stay, room } = check
  const money = (amount) => formatPrice(amount, booking)

  return (
    <aside aria-labelledby="summary-title" className="rounded bg-ink p-6 text-paper sm:p-8 lg:sticky lg:top-8">
      <h2 id="summary-title" className="font-display text-title">
        {request.summaryTitle}
      </h2>
      <div aria-live="polite" className="mt-6">
        {room && <p className="text-lead font-semibold">{room.name}</p>}
        {stay.valid ? (
          <>
            <p className="mt-2">
              {formatDate(values.checkIn, booking.locale)} → {formatDate(values.checkOut, booking.locale)}
            </p>
            <p className="mt-1">
              {fill(copy.summary, {
                nights: plural(plurals.night, stay.nights, booking.locale),
                guests: plural(plurals.guest, stay.guests, booking.locale),
              })}
            </p>
            {room && (
              <>
                <p className="mt-4">
                  {fill(copy.nightsTimesPrice, {
                    nights: plural(plurals.night, stay.nights, booking.locale),
                    price: money(room.pricePerNight),
                  })}
                </p>
                <p className="mt-2 font-display text-title">
                  <span className="mr-2 font-sans text-base font-semibold">{copy.totalLabel}</span>
                  {money(stayTotal(room.pricePerNight, stay.nights))}
                </p>
                <p className="mt-3">{copy.taxNote}</p>
              </>
            )}
          </>
        ) : (
          <p className="mt-2">{copy.fixToSee}</p>
        )}
      </div>
    </aside>
  )
}

function Sent({ message, onEdit }) {
  const content = useContent()
  const { request } = content
  const titleRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const isWhatsApp = message.channel === 'whatsapp'
  const to = requestRecipient(content)
  const href = isWhatsApp ? whatsappHref(content, message) : mailtoHref(content, message)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.body)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="rounded bg-sand p-6 sm:p-8 lg:p-12">
      <h2 ref={titleRef} tabIndex={-1} className="font-display text-title outline-none">
        {request.success.title}
      </h2>
      <p className="mt-4 max-w-prose">
        {fill(isWhatsApp ? request.success.whatsappText : request.success.text, { email: to })}
      </p>
      <p className="mt-4 max-w-prose">
        {fill(isWhatsApp ? request.success.whatsappNotOpened : request.success.notOpened, { email: to })}
      </p>

      <label htmlFor="mensaje" className="mt-6 block font-semibold">
        {request.success.messageLabel}
      </label>
      <textarea
        id="mensaje"
        readOnly
        rows={Math.min(message.body.split('\n').length + 1, 16)}
        value={message.body}
        className={`mt-2 w-full rounded bg-paper p-4 text-base text-ink ${focusRing}`}
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={href} {...(isWhatsApp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {isWhatsApp ? request.success.openWhatsApp : request.success.openMail}
        </Button>
        <Button variant="dark" onClick={copyMessage}>
          {request.success.copy}
        </Button>
        <Button variant="light" onClick={onEdit}>
          {request.success.edit}
        </Button>
      </div>
      <p role="status" className="mt-3 min-h-6 font-semibold">
        {copied ? request.success.copied : ''}
      </p>
      <Button href={request.backHref} variant="light" className="mt-4 bg-paper">
        {request.success.backHome}
      </Button>
    </div>
  )
}

export default function BookingRequest({ params, fallback, onOpenLegal }) {
  const content = useContent()
  const { booking, location, request, rooms, roomsSection, search: copy } = content
  const ids = useId()
  const titleRef = useRef(null)
  const [values, setValues] = useState(() => initialRequest(content, params, fallback))
  const [attempted, setAttempted] = useState(false)
  const [message, setMessage] = useState(null)
  const today = todayISO()
  const check = validateRequest(content, values)
  const fieldId = (name) => `${ids}-${name}`
  const errorFor = (field) => {
    const error = attempted ? check.errors.find((item) => item.field === field) : null
    return error ? errorMessage(content, error) : null
  }
  const aria = (field) => ({
    'aria-invalid': Boolean(errorFor(field)),
    'aria-describedby': errorFor(field) ? `${fieldId(field)}-error` : undefined,
  })
  const update = (field) => (event) => setValues({ ...values, [field]: event.target.value })

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const channels = requestChannels(content)

  // Valida y envía la solicitud por el canal elegido: abre el correo o WhatsApp con el mensaje ya redactado.
  function send(channel) {
    setAttempted(true)
    if (!check.valid) {
      document.getElementById(fieldId(check.errors[0].field))?.focus()
      return
    }
    const next = { ...buildRequestMessage(content, values, check.room, check.stay), channel }
    setMessage(next)
    if (channel === 'whatsapp') window.open(whatsappHref(content, next), '_blank', 'noopener,noreferrer')
    else window.location.assign(mailtoHref(content, next))
  }

  function handleSubmit(event) {
    event.preventDefault()
    send(channels[0])
  }

  const channelLabel = (channel) => {
    if (channels.length < 2) return request.submit
    return channel === 'whatsapp' ? request.submitWhatsApp : request.submitEmail
  }

  const visibleErrors = attempted ? check.errors : []

  return (
    <section aria-labelledby="request-title" className="mx-auto max-w-page px-gutter pt-6 lg:pt-10">
      <a
        href={request.backHref}
        className={`inline-flex min-h-11 items-center font-semibold underline underline-offset-4 can-hover:hover:text-accent ${focusRing}`}
      >
        ← {request.backLabel}
      </a>

      <div className="mt-6 max-w-3xl">
        <h1 id="request-title" ref={titleRef} tabIndex={-1} className="text-balance font-display text-section outline-none">
          {request.title}
        </h1>
        <p className="mt-5 text-lead">{request.intro}</p>
      </div>

      {rooms.length === 0 ? (
        <div className="mt-12 max-w-3xl rounded bg-sand p-8 lg:p-12">
          <h2 className="font-display text-title">{roomsSection.empty.title}</h2>
          <p className="mt-4">{roomsSection.empty.text}</p>
          <Button href={`mailto:${location.email}`} variant="dark" className="mt-6">
            {roomsSection.empty.cta}
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            {message ? (
              <Sent message={message} onEdit={() => setMessage(null)} />
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-10">
                {visibleErrors.length > 0 && (
                  <div role="alert" className="rounded border-2 border-accent-strong p-5">
                    <p className="font-semibold">{request.errorsTitle}</p>
                    <ul className="mt-2 list-inside list-disc">
                      {visibleErrors.map((error) => (
                        <li key={`${error.field}-${error.code}`}>{errorMessage(content, error)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <fieldset className="min-w-0 rounded bg-sand p-6 sm:p-8">
                  <legend className="float-left mb-6 w-full font-display text-title">{request.stayTitle}</legend>
                  <div className="clear-both grid gap-5 sm:grid-cols-2">
                    <Field id={fieldId('checkIn')} label={copy.checkInLabel} error={errorFor('checkIn')}>
                      <input
                        id={fieldId('checkIn')}
                        type="date"
                        value={values.checkIn}
                        min={today}
                        onChange={update('checkIn')}
                        className={fieldClass}
                        {...aria('checkIn')}
                      />
                    </Field>
                    <Field id={fieldId('checkOut')} label={copy.checkOutLabel} error={errorFor('checkOut')}>
                      <input
                        id={fieldId('checkOut')}
                        type="date"
                        value={values.checkOut}
                        min={values.checkIn ? addDays(values.checkIn, 1) : today}
                        onChange={update('checkOut')}
                        className={fieldClass}
                        {...aria('checkOut')}
                      />
                    </Field>
                    <Field id={fieldId('guests')} label={copy.guestsLabel} error={errorFor('guests')}>
                      <input
                        id={fieldId('guests')}
                        type="number"
                        inputMode="numeric"
                        min={booking.minGuests}
                        max={booking.maxGuests}
                        value={values.guests}
                        onChange={update('guests')}
                        className={fieldClass}
                        {...aria('guests')}
                      />
                    </Field>
                    <Field id={fieldId('room')} label={request.roomLabel} error={errorFor('room')}>
                      <select
                        id={fieldId('room')}
                        value={values.roomId}
                        onChange={update('roomId')}
                        className={fieldClass}
                        {...aria('room')}
                      >
                        {rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {fill(request.roomOption, { room: room.name, price: formatPrice(room.pricePerNight, booking) })}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="min-w-0 rounded bg-sand p-6 sm:p-8">
                  <legend className="float-left mb-6 w-full font-display text-title">{request.guestTitle}</legend>
                  <div className="clear-both grid gap-5 sm:grid-cols-2">
                    <Field id={fieldId('name')} label={request.nameLabel} error={errorFor('name')}>
                      <input
                        id={fieldId('name')}
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={update('name')}
                        className={fieldClass}
                        {...aria('name')}
                      />
                    </Field>
                    <Field id={fieldId('email')} label={request.emailLabel} error={errorFor('email')}>
                      <input
                        id={fieldId('email')}
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={update('email')}
                        className={fieldClass}
                        {...aria('email')}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id={fieldId('phone')} label={request.phoneLabel}>
                        <input
                          id={fieldId('phone')}
                          type="tel"
                          autoComplete="tel"
                          value={values.phone}
                          onChange={update('phone')}
                          className={fieldClass}
                        />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <Field id={fieldId('notes')} label={request.notesLabel} hint={request.notesHint}>
                        <textarea
                          id={fieldId('notes')}
                          rows={4}
                          value={values.notes}
                          onChange={update('notes')}
                          aria-describedby={`${fieldId('notes')}-hint`}
                          className={`${fieldClass} py-3`}
                        />
                      </Field>
                    </div>
                  </div>
                </fieldset>

                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id={fieldId('consent')}
                      type="checkbox"
                      checked={values.consent}
                      onChange={(event) => setValues({ ...values, consent: event.target.checked })}
                      className={`mt-1 h-6 w-6 shrink-0 accent-accent ${focusRing}`}
                      {...aria('consent')}
                    />
                    <label htmlFor={fieldId('consent')} className="min-w-0">
                      {request.consent.before}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('dataTreatment')}
                        className={`underline underline-offset-4 can-hover:hover:text-accent ${focusRing}`}
                      >
                        {request.consent.link}
                      </button>
                      {request.consent.after}
                    </label>
                  </div>
                  {errorFor('consent') && (
                    <p id={`${fieldId('consent')}-error`} className="mt-2 font-semibold text-accent-strong">
                      {errorFor('consent')}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {channels.map((channel, index) => (
                    <Button
                      key={channel}
                      type={index === 0 ? 'submit' : 'button'}
                      variant={index === 0 ? 'primary' : 'dark'}
                      onClick={index === 0 ? undefined : () => send(channel)}
                      className="w-full sm:w-auto"
                    >
                      {channelLabel(channel)}
                    </Button>
                  ))}
                </div>
              </form>
            )}
          </div>

          <div className="min-w-0 lg:col-span-4 lg:col-start-9">
            <Summary values={values} check={check} />
          </div>
        </div>
      )}
    </section>
  )
}
