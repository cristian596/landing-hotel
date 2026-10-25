# Plantilla de landing para hotel

React + Vite + Tailwind CSS v3. Todo el contenido es de ejemplo.

```bash
npm install
npm run dev      # desarrollo
npm run build    # versión de producción en dist/
```

## Qué cambiar para cada cliente

| Qué | Dónde |
| --- | --- |
| Nombre, textos, habitaciones, precios, servicios, dirección, textos legales y de cookies | `src/data/content.js` |
| Enlace del motor de reservas y nombres de sus parámetros, moneda e idioma | `booking` en `src/data/content.js` |
| Fotos (id de Unsplash y texto alternativo) y créditos de fotógrafos | `src/data/images.js` |
| Colores, tipografías, tamaños de texto, márgenes y separación entre secciones | `tailwind.config.js` |
| Fuentes de Google Fonts | `index.html` (y `fontFamily` en `tailwind.config.js`) |

Los componentes no contienen textos propios: con `content.js` e `images.js` se personaliza la página completa.

## Notas

- **Reservas**: el botón «Reservar» enlaza a `booking.url` y añade entrada, salida, huéspedes y habitación con los nombres de `booking.params`. Si el motor no acepta parámetros, pon `params: null`.
- **Plurales**: `plurals` en `content.js` define las formas singular y plural («1 noche», «2 noches»).
- **Habitaciones**: si la lista `rooms` está vacía, la página muestra un aviso con un enlace de contacto.
- **Imágenes**: si una foto no carga, se muestra un fondo de color con el nombre de la habitación o el pie de foto.
- **Cookies**: la elección se guarda en `localStorage` con la clave `cookies.storageKey`. La plantilla no carga ningún script de analítica ni de marketing; conéctalos según la categoría aceptada.
- **Legal**: las políticas de privacidad y de cookies son textos de ejemplo y deben sustituirse por los reales.
