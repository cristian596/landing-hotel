import { useState } from 'react'

// Imagen que, si no existe o falla al cargar, muestra un fondo de color con `label`.
// `className` define el tamaño del recuadro; la imagen lo cubre entero.
export default function Photo({ image, label, sizes = '100vw', priority = false, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-sand-strong ${className}`}>
      {!image || failed ? (
        <div role="img" aria-label={image?.alt || label} className="flex h-full w-full items-end p-6">
          <span className="font-display text-title [overflow-wrap:anywhere]">{label}</span>
        </div>
      ) : (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  )
}
