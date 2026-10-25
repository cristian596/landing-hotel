import { photoCredits } from '../data/images'
import { useContent } from '../i18n/useLanguage'

const year = new Date().getFullYear()

const linkClass =
  'inline-flex min-h-11 items-center text-left underline underline-offset-4 transition-colors duration-150 can-hover:hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export default function Footer({ onOpenLegal, onOpenCookieSettings }) {
  const { footer, hotel, location } = useContent()
  return (
    <footer className="mt-section bg-sand">
      <div className="mx-auto max-w-page px-gutter py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 md:col-span-2 lg:col-span-5">
            <p className="font-display text-title [overflow-wrap:anywhere]">{hotel.name}</p>
            <p className="mt-4 max-w-md">{hotel.description}</p>
          </div>

          <div className="min-w-0 lg:col-span-3 lg:col-start-7">
            <h2 className="font-semibold">{footer.contactTitle}</h2>
            <address className="mt-3 not-italic [overflow-wrap:anywhere]">
              {location.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="mt-2">
              <li>
                <a href={`tel:${location.phone.replace(/[^\d+]/g, '')}`} className={linkClass}>
                  {location.phone}
                </a>
              </li>
              <li className="[overflow-wrap:anywhere]">
                <a href={`mailto:${location.email}`} className={linkClass}>
                  {location.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-3 lg:col-start-10">
            <h2 className="font-semibold">{footer.legalTitle}</h2>
            <ul className="mt-2">
              <li>
                <button type="button" onClick={() => onOpenLegal('privacy')} className={linkClass}>
                  {footer.privacyLabel}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenLegal('dataTreatment')} className={linkClass}>
                  {footer.dataTreatmentLabel}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenLegal('cookies')} className={linkClass}>
                  {footer.cookiesLabel}
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenCookieSettings} className={linkClass}>
                  {footer.cookieSettingsLabel}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-2 lg:grid-cols-12 lg:items-center lg:gap-8">
          <p className="min-w-0 [overflow-wrap:anywhere] lg:col-span-5">
            © {year} {hotel.name}. {footer.rights}
          </p>
          {footer.sampleNotice && <p className="lg:col-span-3 lg:col-start-7">{footer.sampleNotice}</p>}
          <p className="lg:col-span-3 lg:col-start-10">
            <a href={footer.photosUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {footer.photosLabel}
            </a>
            {photoCredits.map((credit) => (
              <span key={credit.name}>
                {', '}
                <a href={credit.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {credit.name}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
