import { booking, location, plurals, rooms, roomsSection, search as searchCopy } from '../data/content'
import { images } from '../data/images'
import { buildBookingUrl, fill, formatPrice, plural, quoteRoom } from '../lib/booking'
import Button from './Button'
import Photo from './Photo'
import Reveal from './Reveal'

function RoomRow({ room, reverse, search, quote }) {
  const roomQuote = quoteRoom(room, quote)
  const titleId = `habitacion-${room.id}`

  return (
    <article aria-labelledby={titleId} className="grid gap-8 lg:grid-cols-12 lg:items-center">
      <Reveal className={`lg:col-span-7 lg:row-start-1 ${reverse ? 'lg:col-start-6' : 'lg:col-start-1'}`}>
        <Photo
          image={images[room.image]}
          label={room.name}
          sizes="(min-width: 64rem) 55vw, 100vw"
          className="aspect-[4/5] sm:aspect-[3/2]"
        />
      </Reveal>

      <Reveal step={1} className={`min-w-0 lg:col-span-4 lg:row-start-1 ${reverse ? 'lg:col-start-1' : 'lg:col-start-9'}`}>
        <h3 id={titleId} className="font-display text-title [overflow-wrap:anywhere]">
          {room.name}
        </h3>
        <p className="mt-4">{room.description}</p>
        <p className="mt-4 font-semibold">
          {[fill(roomsSection.capacity, { guests: plural(plurals.guest, room.capacity, booking.locale) }), room.bed, room.size]
            .filter(Boolean)
            .join(' · ')}
        </p>
        <p className="mt-6 text-lead">{fill(searchCopy.perNight, { price: formatPrice(room.pricePerNight, booking) })}</p>
        {roomQuote.bookable && (
          <p className="mt-1">
            {fill(roomsSection.totalForStay, {
              nights: plural(plurals.night, quote.nights, booking.locale),
              price: formatPrice(roomQuote.total, booking),
            })}
          </p>
        )}
        {roomQuote.overCapacity && (
          <p className="mt-1 font-semibold text-accent-strong">
            {fill(searchCopy.overCapacity, { guests: plural(plurals.guest, room.capacity, booking.locale) })}
          </p>
        )}
        <Button
          href={roomQuote.bookable ? buildBookingUrl(booking, { ...search, roomId: room.id }) : `#${searchCopy.id}`}
          aria-label={fill(searchCopy.bookRoomLabel, { room: room.name })}
          className="mt-6"
        >
          {searchCopy.bookLabel}
        </Button>
      </Reveal>
    </article>
  )
}

export default function Rooms({ search, quote }) {
  return (
    <section id={roomsSection.id} aria-labelledby="rooms-title" className="mx-auto mt-section max-w-page px-gutter">
      <div className="max-w-3xl">
        <Reveal as="h2" id="rooms-title" className="font-display text-section">
          {roomsSection.title}
        </Reveal>
        {rooms.length > 0 && (
          <Reveal as="p" step={1} className="mt-5 text-lead">
            {roomsSection.intro}
          </Reveal>
        )}
      </div>

      {rooms.length === 0 ? (
        <Reveal className="mt-12 max-w-3xl rounded bg-sand p-8 lg:p-12">
          <h3 className="font-display text-title">{roomsSection.empty.title}</h3>
          <p className="mt-4">{roomsSection.empty.text}</p>
          <Button href={`mailto:${location.email}`} variant="dark" className="mt-6">
            {roomsSection.empty.cta}
          </Button>
        </Reveal>
      ) : (
        <div className="mt-14 space-y-20 lg:mt-24 lg:space-y-32">
          {rooms.map((room, index) => (
            <RoomRow key={room.id} room={room} reverse={index % 2 === 1} search={search} quote={quote} />
          ))}
        </div>
      )}
    </section>
  )
}
