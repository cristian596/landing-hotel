import { useEffect, useId, useRef, useState } from 'react'
import Button from './Button'

// Diálogo modal sobre <dialog> nativo: gestiona foco, Esc y fondo.
export default function Dialog({ open, onClose, title, closeLabel, children }) {
  const ref = useRef(null)
  const titleId = useId()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }
    if (dialog.open) dialog.close()
  }, [open])

  function handleClose() {
    setVisible(false)
    onClose()
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={handleClose}
      className={`m-auto max-h-[85vh] w-[min(40rem,calc(100%-2.5rem))] overflow-y-auto bg-paper p-6 text-ink transition-[transform,opacity] duration-200 ease-out-strong backdrop:bg-ink/60 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none sm:p-10 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
    >
      {/* Si el título no cabe junto al botón, el botón pasa arriba a la derecha. */}
      <div className="flex flex-wrap-reverse items-start justify-end gap-4">
        <h2 id={titleId} className="min-w-0 flex-1 basis-48 font-display text-title [overflow-wrap:anywhere]">
          {title}
        </h2>
        <Button variant="light" className="shrink-0 bg-sand px-4" onClick={() => ref.current?.close()}>
          {closeLabel}
        </Button>
      </div>
      <div className="mt-6">{children}</div>
    </dialog>
  )
}
