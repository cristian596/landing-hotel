import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'

// Imagen que, si no existe o falla al cargar, muestra un fondo de color con `label`.
// `className` define el tamaño del recuadro; la imagen lo cubre entero.
export default function Photo({ image, label, sizes = '100vw', priority = false, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false)
  const { language } = useLanguage()
  // `alt` puede ser un texto o un objeto con un texto por idioma ({ es, en }).
  const alt = typeof image?.alt === 'string' ? image.alt : (image?.alt?.[language] ?? Object.values(image?.alt ?? {})[0])

  return (
    <div className={`relative overflow-hidden bg-sand-strong ${className}`}>
      {!image || failed ? (
        <div role="img" aria-label={alt || label} className="flex h-full w-full items-end p-6">
          <span className="font-display text-title [overflow-wrap:anywhere]">{label}</span>
        </div>
      ) : (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={alt}
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
