import { useInView } from '../hooks/useInView'

const delays = ['delay-0', 'delay-75', 'delay-150', 'delay-225', 'delay-300']

// Entrada al aparecer en pantalla: sube 24 px y gana opacidad una sola vez.
// `step` desfasa elementos de un mismo grupo (0 = sin retraso, 1 = 75 ms, 2 = 150 ms…).
export default function Reveal({ as: Tag = 'div', step = 0, className = '', children, ...props }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`transition-[transform,opacity] duration-300 ease-out-strong motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${delays[step] ?? delays[0]} ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
