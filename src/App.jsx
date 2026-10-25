import { useEffect, useState } from 'react'
import BookingRequest from './components/BookingRequest'
import BookingSearch from './components/BookingSearch'
import CookieConsent from './components/CookieConsent'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import LegalDialog from './components/LegalDialog'
import Location from './components/Location'
import Navbar from './components/Navbar'
import Rooms from './components/Rooms'
import Services from './components/Services'
import { booking, hotel, nav, request } from './data/content'
import { useHashRoute } from './hooks/useHashRoute'
import { addDays, todayISO, validateSearch } from './lib/booking'

function initialSearch() {
  const checkIn = addDays(todayISO(), booking.defaultCheckInOffset)
  return {
    checkIn,
    checkOut: addDays(checkIn, booking.defaultNights),
    guests: String(booking.defaultGuests),
  }
}

export default function App() {
  const [search, setSearch] = useState(initialSearch)
  const [legalDoc, setLegalDoc] = useState(null)
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false)
  const { route, hash } = useHashRoute()
  const quote = validateSearch(search, booking)
  const isRequest = route.name === 'request'

  useEffect(() => {
    document.title = isRequest ? `${request.title} · ${hotel.name}` : hotel.name
  }, [isRequest])

  // Al cambiar de página con el hash, el navegador no desplaza solo: arriba en la solicitud, a la sección en la portada.
  useEffect(() => {
    if (isRequest) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [isRequest, hash])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        {nav.skipLink}
      </a>
      <Navbar />
      <main id="contenido">
        {isRequest ? (
          <BookingRequest key={hash} params={route.params} fallback={search} onOpenLegal={setLegalDoc} />
        ) : (
          <>
            <Hero />
            <BookingSearch search={search} onSearchChange={setSearch} quote={quote} />
            <Rooms search={search} quote={quote} />
            <Services />
            <Gallery />
            <Location />
            <FinalCta />
          </>
        )}
      </main>
      <Footer onOpenLegal={setLegalDoc} onOpenCookieSettings={() => setCookieSettingsOpen(true)} />
      <LegalDialog doc={legalDoc} onClose={() => setLegalDoc(null)} />
      <CookieConsent
        settingsOpen={cookieSettingsOpen}
        onSettingsOpenChange={setCookieSettingsOpen}
        onOpenPolicy={() => setLegalDoc('cookies')}
      />
    </>
  )
}
