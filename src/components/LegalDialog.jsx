import { legal } from '../data/content'
import Dialog from './Dialog'

// Muestra la política de privacidad o la de cookies. `doc` es 'privacy', 'cookies' o null.
export default function LegalDialog({ doc, onClose }) {
  const page = doc ? legal[doc] : null

  return (
    <Dialog open={Boolean(page)} onClose={onClose} title={page?.title} closeLabel={legal.closeLabel}>
      <div className="space-y-4">
        {page?.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Dialog>
  )
}
