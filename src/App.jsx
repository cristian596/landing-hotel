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
import WhatsAppButton from './components/WhatsAppButton'
import { useHashRoute } from './hooks/useHashRoute'
import { useContent } from './i18n/useLanguage'
import { useSeo } from './i18n/useSeo'
import { addDays, todayISO, validateSearch } from './lib/booking'

function initialSearch(booking) {
  const checkIn = addDays(todayISO(), booking.defaultCheckInOffset)
  return {
    checkIn,
    checkOut: addDays(checkIn, booking.defaultNights),
    guests: String(booking.defaultGuests),
  }
}

export default function App() {
  const { booking, nav } = useContent()
  const [search, setSearch] = useState(() => initialSearch(booking))
  const [legalDoc, setLegalDoc] = useState(null)
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false)
  const { route, hash } = useHashRoute()
  const quote = validateSearch(search, booking)
  const isRequest = route.name === 'request'

  // Título, descripción, vista previa y datos estructurados en el idioma actual.
  useSeo(isRequest ? 'request' : 'home')

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
      <WhatsAppButton />
      <LegalDialog doc={legalDoc} onClose={() => setLegalDoc(null)} />
      <CookieConsent
        settingsOpen={cookieSettingsOpen}
        onSettingsOpenChange={setCookieSettingsOpen}
        onOpenPolicy={() => setLegalDoc('cookies')}
      />
    </>
  )
}
