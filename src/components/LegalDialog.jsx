import { useContent } from '../i18n/useLanguage'
import Dialog from './Dialog'

// Muestra una política legal. `doc` es 'privacy', 'dataTreatment', 'cookies' o null.
// Cada elemento de `body` es un párrafo (texto), un subtítulo ({ heading }) o una lista ({ list }).
export default function LegalDialog({ doc, onClose }) {
  const { legal } = useContent()
  const page = doc ? legal[doc] : null

  return (
    <Dialog open={Boolean(page)} onClose={onClose} title={page?.title} closeLabel={legal.closeLabel}>
      <div className="space-y-4">
        {page?.body.map((item, index) => {
          if (typeof item === 'string') return <p key={item}>{item}</p>
          if (item.heading) {
            return (
              <h3 key={item.heading} className="pt-2 font-semibold">
                {item.heading}
              </h3>
            )
          }
          return (
            <ul key={index} className="list-disc space-y-1 pl-6">
              {item.list.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          )
        })}
      </div>
    </Dialog>
  )
}
