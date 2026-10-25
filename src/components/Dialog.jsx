import { useEffect, useId, useRef, useState } from 'react'
import Button from './Button'

// La salida es más corta que la entrada: la respuesta del sistema debe sentirse rápida.
const EXIT_MS = 150

// Diálogo modal sobre <dialog> nativo: gestiona foco, Esc y fondo. Entra y sale con un desvanecimiento
// (el fondo incluido); con movimiento reducido se quita el escalado y se mantiene el desvanecimiento.
export default function Dialog({ open, onClose, title, closeLabel, children }) {
  const ref = useRef(null)
  const timer = useRef(0)
  const titleId = useId()
  const [visible, setVisible] = useState(false)

  // Anima la salida y cierra el <dialog> cuando termina.
  function requestClose() {
    setVisible(false)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => ref.current?.close(), EXIT_MS)
  }

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open) {
      clearTimeout(timer.current)
      if (!dialog.open) dialog.showModal()
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }
    if (dialog.open) {
      const frame = requestAnimationFrame(requestClose)
      return () => cancelAnimationFrame(frame)
    }
  }, [open])

  useEffect(() => () => clearTimeout(timer.current), [])

  function handleClose() {
    clearTimeout(timer.current)
    setVisible(false)
    onClose()
  }

  // Esc también pasa por la animación de salida.
  function handleCancel(event) {
    event.preventDefault()
    requestClose()
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={handleClose}
      onCancel={handleCancel}
      className={`m-auto max-h-[85vh] w-[min(40rem,calc(100%-2.5rem))] overflow-y-auto bg-paper p-6 text-ink transition-[transform,opacity] ease-out-strong backdrop:bg-ink/60 backdrop:transition-opacity backdrop:ease-out-strong motion-reduce:transform-none sm:p-10 ${visible ? 'scale-100 opacity-100 duration-200 backdrop:opacity-100 backdrop:duration-200' : 'scale-95 opacity-0 duration-150 backdrop:opacity-0 backdrop:duration-150'}`}
    >
      {/* Si el título no cabe junto al botón, el botón pasa arriba a la derecha. */}
      <div className="flex flex-wrap-reverse items-start justify-end gap-4">
        <h2 id={titleId} className="min-w-0 flex-1 basis-48 font-display text-title [overflow-wrap:anywhere]">
          {title}
        </h2>
        <Button variant="light" className="shrink-0 bg-sand px-4" onClick={requestClose}>
          {closeLabel}
        </Button>
      </div>
      <div className="mt-6">{children}</div>
    </dialog>
  )
}
