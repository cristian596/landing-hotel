# Plantilla de landing para hotel

Landing de una sola página para hoteles pequeños. Incluye: **hero** con foto, **buscador de fechas** con precio en vivo, **habitaciones**, **servicios**, **galería**, **ubicación**, **llamada a la acción final**, una **página de reserva** propia (`#/reserva`) y **textos legales** (privacidad, tratamiento de datos personales y cookies) con **banner de cookies**, en **español**.

Está hecha con **React 19**, **Vite 8** y **Tailwind CSS 3**. No necesita base de datos ni servidor propio: la solicitud de reserva no se guarda en ningún sitio, sino que abre el correo del huésped con el mensaje ya escrito. Al compilarla se genera una carpeta de archivos estáticos (`dist`) que se publica en cualquier hosting estático, como Cloudflare Pages.

Todos los datos de la plantilla son **de ejemplo** (Hotel Ejemplo, `reservas@example.com`, precios y textos legales inventados). Antes de publicar, léete la lista de la sección 7 y reemplaza cada dato.

---

## 1. Requisitos

- **Node.js 20.19 o superior** (o 22.12 o superior; se recomienda 22). Verifica tu versión con `node -v`.
- **npm** (viene con Node.js).

## 2. Instalación y prueba local

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
npm run dev
```

La web queda disponible en **http://localhost:5173**. Los cambios que guardes se ven al instante. Para detenerlo: `Ctrl + C`.

La página de reserva está en **http://localhost:5173/#/reserva**.

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor local de desarrollo. |
| `npm run build` | Compila la web estática. El resultado queda en la carpeta `dist`, que es la que se publica. |
| `npm run preview` | Sirve la carpeta `dist` en local para probar la versión compilada. |
| `npm run lint` | Revisa el código en busca de errores. |

## 3. Mapa de archivos

| Qué quieres cambiar | Dónde está |
| --- | --- |
| Nombre del hotel, textos, habitaciones, precios, servicios, galería, dirección, teléfono y correo | `src/data/content.js` |
| Modo de reserva, moneda, idioma y límites de huéspedes | `booking` en `src/data/content.js` |
| Textos de la página de reserva, correo que recibe las solicitudes y mensaje del correo | `request` en `src/data/content.js` |
| Textos legales y de cookies | `legal` y `cookies` en `src/data/content.js` |
| Fotos (id de Unsplash o ruta propia, y texto alternativo) y créditos de fotógrafos | `src/data/images.js` |
| Colores, tipografías, tamaños de texto, márgenes y separación entre secciones | `tailwind.config.js` |
| Fuentes de Google Fonts | `index.html` (y `fontFamily` en `tailwind.config.js`) |
| Título de la pestaña, descripción para buscadores y color del navegador | `index.html` |
| Icono de la pestaña | `public/favicon.svg` |
| Lógica de fechas, precios y enlace de reserva | `src/lib/booking.js` y `src/lib/request.js` |
| Orden de las secciones | `src/App.jsx` |

Los componentes no contienen textos propios: con `content.js` e `images.js` se personaliza la página completa.

---

## 4. Cómo cambiar los datos del hotel

Todo el contenido está en **`src/data/content.js`**. Cada bloque tiene el nombre de la sección:

| Bloque | Qué contiene |
| --- | --- |
| `hotel` | Nombre y descripción corta (aparece en el pie de página y en el título de la pestaña). |
| `nav` | Enlaces del menú y botón «Reservar». |
| `hero` | Título, subtítulo y botón de la portada. |
| `rooms` | Lista de habitaciones: `id`, `name`, `description`, `pricePerNight`, `capacity`, `bed`, `size` e `image` (clave de `images.js`). |
| `services` | Lista de servicios con nombre y descripción. |
| `gallery` | Fotos de la galería y su pie de foto. El orden define el mosaico. |
| `location` | Dirección, teléfono, correo, enlace al mapa y foto. |
| `finalCta` | Texto y botón del cierre de la página. |
| `footer` | Textos del pie de página. |

**Importante:** cambia también los textos que dicen «de ejemplo», porque se ven en la web publicada:

- `search.taxNote` («Precios de ejemplo con impuestos incluidos.»): ajústalo a la realidad del hotel, por ejemplo si el IVA está incluido o no.
- `footer.sampleNotice`: déjalo vacío (`''`) y el aviso desaparece del pie de página.
- `services.intro` y `location.text`: tienen frases como «los horarios son de ejemplo» y «Dirección de ejemplo».

**Moneda e idioma de los precios.** En `booking` están `currency` y `locale`. Para pesos colombianos:

```js
// Antes
currency: 'EUR',
locale: 'es-ES',

// Después
currency: 'COP',
locale: 'es-CO',
```

**Habitaciones.** Para añadir una, copia un bloque de `rooms`, dale un `id` único y apunta `image` a una clave de `images.js`. Si dejas la lista `rooms` vacía, la página muestra un aviso con un enlace para escribir al hotel.

**Fotos.** Las actuales son de Unsplash. Para usar fotos propias, súbelas a la carpeta `public/` y en `images.js` reemplaza la entrada por un objeto con `alt` y `src`:

```js
roomGarden: { alt: 'Habitación con cama de matrimonio y luz natural', src: '/fotos/jardin.jpg' },
```

Si una foto no carga, se muestra un fondo de color con el nombre de la habitación o el pie de foto.

---

## 5. Cómo cambiar las secciones

- **Textos**: todo en `content.js`. Los textos con `{variable}` (por ejemplo `{price}` o `{nights}`) se rellenan solos: no borres las llaves.
- **Plurales**: `plurals` en `content.js` define las formas singular y plural («1 noche», «2 noches»).
- **Colores y tipografías**: `tailwind.config.js` define la paleta completa (`paper`, `ink`, `accent`, `sand`) y solo cinco tamaños de texto. Al cambiar un color ahí, cambia en toda la página. La plantilla usa solo Tailwind, sin archivos CSS propios.
- **Orden de las secciones**: se ordenan en `src/App.jsx`.
- **Textos legales**: privacidad, tratamiento de datos personales (basada en la Ley 1581 de 2012, de Colombia) y cookies. Son borradores de ejemplo. **Deben revisarlos un abogado antes de publicar.** Hay que poner el nombre real, el NIT, la dirección, el correo y la fecha de vigencia. Cada párrafo puede ser texto, un subtítulo (`{ heading: '...' }`) o una lista (`{ list: [...] }`).
- **Cookies**: el banner guarda la elección en `localStorage` con la clave `cookies.storageKey`. La plantilla **no carga ningún script de analítica ni de marketing**; si el hotel añade uno, debe activarlo solo según la categoría aceptada.

---

## 6. Reservas: totalmente personalizables

El flujo de reservas se adapta a como trabaje cada hotel. Los botones «Reservar» de las habitaciones y del buscador llevan siempre al mismo destino, que se elige en `booking.mode` (en `content.js`). Estas son las opciones:

| ¿Qué necesita el hotel? | Opción | Estado |
| --- | --- | --- |
| Recibir solicitudes por correo, sin pagar ni configurar nada | **A. Solicitud por correo** | Incluida y activa por defecto |
| Ya usa un motor de reservas en línea | **B. Motor externo** | Incluida; se configura en `content.js` |
| Recibir las reservas por WhatsApp | **C. WhatsApp** | Se integra bajo pedido |
| Pagos en línea, calendario de disponibilidad real u otro sistema | **D. Integración a medida** | Se presupuesta aparte |

### Opción A: solicitud por correo (por defecto)

`booking.mode: 'form'`. El botón «Reservar» abre la página `#/reserva` con las fechas, los huéspedes y la habitación ya cargados. El huésped deja su nombre, correo y teléfono, autoriza el tratamiento de sus datos y pulsa **Enviar solicitud**. Se abre su programa de correo con la solicitud ya redactada (habitación, fechas, noches, huéspedes, total estimado y sus datos) hacia el correo del hotel.

- El correo que recibe las solicitudes es `request.to`. Si lo dejas vacío (`''`), se usa `location.email`.
- Los textos de la página y el mensaje del correo están en `request` en `content.js`. Las variables del mensaje son `room`, `checkIn`, `checkOut`, `nights`, `guests`, `total`, `name`, `email`, `phone` y `notes`.
- No hay servidor, no se guarda ningún dato y no se cobra nada: el hotel confirma la disponibilidad por correo.
- Si el huésped no tiene programa de correo configurado, la pantalla de confirmación tiene los botones **Abrir el correo** y **Copiar mensaje**, para que pueda enviarlo desde donde quiera.
- La página usa el hash de la URL (`#/reserva`), así que funciona en cualquier hosting estático sin configurar redirecciones.

### Opción B: motor de reservas externo

Si el hotel ya tiene un motor de reservas, el botón «Reservar» puede llevar directamente a él. En `booking`:

```js
// Antes
mode: 'form',

// Después
mode: 'external',
url: 'https://reservas.mihotel.com/motor',
params: { checkIn: 'checkin', checkOut: 'checkout', guests: 'adultos', room: 'habitacion' },
```

- `url` es el enlace del motor.
- `params` dice **cómo se llama cada dato en el motor**: a la izquierda, el dato de la plantilla (`checkIn`, `checkOut`, `guests`, `room`); a la derecha, el nombre del parámetro que espera el motor. Así el huésped llega con sus fechas y su habitación ya elegidas.
- Si el motor no acepta parámetros, pon `params: null` y se enlaza la URL tal cual.
- Los nombres exactos de los parámetros los da el proveedor del motor. Si el motor funciona con un widget incrustado o con una API, es una integración a medida (opción D).

### Opción C: reservas por WhatsApp

No viene activada por defecto, pero se puede poner. El botón «Reservar» abriría WhatsApp con el mensaje ya escrito (habitación, fechas, huéspedes, total estimado y datos del huésped) hacia el número del hotel, y el huésped lo envía con un toque. Funcionaría igual que la opción A: sin servidor y sin guardar datos.

- Se necesita el **número de WhatsApp del hotel**, con código de país y solo dígitos (por ejemplo `573001234567`).
- Se puede combinar con la opción A, para que el huésped elija entre correo y WhatsApp.
- Como es una personalización, se presupuesta aparte (ver sección 9).

### Notas sobre las reservas

- **Los datos de la solicitud no se guardan en la web.** Quedan en el correo (o en el chat) del hotel y del huésped.
- **Prueba siempre el flujo antes de entregar:** envía una solicitud de prueba desde un móvil y desde un ordenador, y comprueba que llega al correo real del hotel.
- **Los precios son orientativos.** El total del resumen es `precio por noche × noches`. Si el hotel tiene tarifas por temporada, descuentos o impuestos adicionales, el cálculo se ajusta en `src/lib/booking.js` (personalización).

---

## 7. Antes de publicar

Lista de verificación:

- [ ] Nombre, descripción, habitaciones, precios, servicios y galería sustituidos por los del hotel.
- [ ] Moneda e idioma de los precios correctos (`booking.currency` y `booking.locale`).
- [ ] Dirección, teléfono, correo y enlace al mapa reales en `location`.
- [ ] Modo de reserva elegido (`booking.mode`) y, si es correo, `request.to` con el correo real.
- [ ] Si es motor externo: `booking.url` y `booking.params` reales, y probado con fechas de prueba.
- [ ] Solicitud de reserva de prueba enviada desde un móvil real y recibida en el correo del hotel.
- [ ] Textos «de ejemplo» eliminados (`search.taxNote`, `footer.sampleNotice`, `services.intro`, `location.text`).
- [ ] Textos legales revisados **por un abogado**, con el nombre, el NIT, la dirección, el correo y la fecha de vigencia reales.
- [ ] Las fotos son del hotel, o tienes derecho a usarlas, y los créditos de fotógrafos están en `photoCredits` de `images.js`.
- [ ] `index.html` con el título real (`<title>`) y la descripción real (`<meta name="description">`); el actual dice «Plantilla de landing para hotel».
- [ ] Icono de la pestaña (`public/favicon.svg`) cambiado.
- [ ] `npm run lint` y `npm run build` terminan sin errores.
- [ ] En el sitio publicado, `/`, `/#habitaciones` y `/#/reserva` se ven como se espera.

---

## 8. Cómo publicar

El sitio se compila con `npm run build` y se publica la carpeta **`dist`**. Sirve cualquier hosting estático (Cloudflare Pages, Netlify, Vercel). Con **Cloudflare Pages** (tiene plan gratuito):

- **Framework preset:** `None`.
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node:** versión 20.19 o superior (se puede fijar con la variable de entorno `NODE_VERSION`, por ejemplo `22`).

No hacen falta redirecciones ni variables de entorno: la página de reserva funciona con el hash de la URL.

---

## 9. Soporte y próximos pasos

El soporte gratuito del proveedor dura **[PLAZO DE SOPORTE]** desde la entrega, con respuesta en **[TIEMPO DE RESPUESTA]**. El mantenimiento posterior se contrata aparte. La personalización de textos, fotos, colores, tarifas y contenido legal, y las integraciones (motor de reservas externo, WhatsApp, pagos u otros sistemas), se presupuestan por separado.

**Si algo se rompe:**

1. **La web publicada se ve mal después de un cambio.** Restaura un despliegue anterior desde el panel de Cloudflare Pages (pestaña *Deployments*).
2. **`npm run build` da error.** El mensaje indica el archivo y la línea. Los errores más comunes son una comilla o llave sin cerrar, o una coma que falta en `content.js`.
3. **Un cambio no aparece en local.** Detén `npm run dev`, vuelve a ejecutarlo y recarga con `Ctrl + F5`.
4. **El botón «Reservar» no abre el correo.** El huésped no tiene programa de correo configurado. En la pantalla de confirmación puede copiar el mensaje y enviarlo desde su correo web.
5. **Una foto no carga.** Si es de Unsplash, comprueba que el id sea correcto en `images.js`; si es propia, que la ruta exista en `public/`. Mientras tanto se muestra un fondo de color con el nombre.
6. **Un comando no funciona.** Verifica `node -v` y que estás dentro de la carpeta del proyecto.
