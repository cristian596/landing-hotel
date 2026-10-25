import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const delays = ['delay-0', 'delay-75', 'delay-150', 'delay-225', 'delay-300']

// Entrada al aparecer en pantalla: sube 24 px y gana opacidad una sola vez.
// `step` desfasa elementos de un mismo grupo (0 = sin retraso, 1 = 75 ms, 2 = 150 ms…).
// Con movimiento reducido solo se desvanece (sin desplazamiento).
// Al terminar la entrada se retiran las clases de movimiento: así el bloque deja de tener un `transform` activo
// (que crearía una capa de composición permanente) y ya no vuelve a animarse.
export default function Reveal({ as: Tag = 'div', step = 0, className = '', children, ...props }) {
  const [ref, inView] = useInView()
  const [settled, setSettled] = useState(false)

  function handleTransitionEnd(event) {
    if (event.target === event.currentTarget && event.propertyName === 'opacity') setSettled(true)
  }

  const motion = settled
    ? ''
    : `transition-[transform,opacity] duration-300 ease-out-strong motion-reduce:translate-y-0 motion-reduce:delay-0 motion-reduce:duration-150 ${delays[step] ?? delays[0]} ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`

  return (
    <Tag ref={ref} onTransitionEnd={handleTransitionEnd} className={`${motion} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
