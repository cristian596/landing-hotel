# Plantilla de landing para hotel

Landing de una sola página para hoteles pequeños, en **español e inglés**. Incluye: **hero** con foto, **buscador de fechas** con precio en vivo, **habitaciones**, **servicios**, **galería**, **ubicación**, **llamada a la acción final**, un **selector de idioma (ES | EN)**, un **botón flotante de WhatsApp** con rebote, una **página de reserva** propia (`#/reserva`) y **textos legales** (privacidad, tratamiento de datos personales y cookies) con **banner de cookies**.

Los precios se muestran en **pesos colombianos (COP)** en la versión en español y en **dólares estadounidenses (USD)** en la versión en inglés.

Está hecha con **React 19**, **Vite 8** y **Tailwind CSS 3**. No necesita base de datos ni servidor propio: la solicitud de reserva no se guarda en ningún sitio, sino que abre el correo del huésped con el mensaje ya escrito. Al compilarla se genera una carpeta de archivos estáticos (`dist`) que se publica en cualquier hosting estático, como Cloudflare Pages.

Todos los datos de la plantilla son **de ejemplo** (Hotel Ejemplo, `reservas@example.com`, precios y textos legales inventados). Antes de publicar, léete la lista de la sección 9 y reemplaza cada dato.

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
| Nombre del hotel, contacto, habitaciones (precios, capacidad, tamaño, foto), modo de reserva, número de WhatsApp, idioma por defecto | `src/data/site.js` |
| Textos de la web en español, moneda y formato de la versión en español | `src/data/content.es.js` |
| Textos de la web en inglés, moneda y formato de la versión en inglés | `src/data/content.en.js` |
| Lista de idiomas disponibles (y añadir uno nuevo) | `src/data/content.js` |
| Fotos (id de Unsplash o ruta propia, y texto alternativo en cada idioma) y créditos de fotógrafos | `src/data/images.js` |
| Colores, tipografías, tamaños de texto, márgenes, rebote del botón de WhatsApp | `tailwind.config.js` |
| Fuentes de Google Fonts | `index.html` (y `fontFamily` en `tailwind.config.js`) |
| Título y descripción para buscadores y para la vista previa al compartir (en cada idioma) | `seo` en `content.es.js` y `content.en.js` |
| Dirección pública del sitio, imagen al compartir, tipo de negocio, `noindex` y coordenadas | `seo` en `src/data/site.js` |
| Color del navegador en el móvil y carga de fuentes | `index.html` |
| Icono de la pestaña | `public/favicon.svg` |
| Lógica de fechas, precios y enlace de reserva | `src/lib/booking.js` y `src/lib/request.js` |
| Generación de las etiquetas de SEO, `robots.txt` y `sitemap.xml` | `src/lib/seo.js` y `seo-plugin.js` |
| Selector de idioma | `src/components/LanguageSwitch.jsx` y `src/i18n/` |
| Orden de las secciones | `src/App.jsx` |

Los componentes no contienen textos propios: con `site.js`, `content.es.js`, `content.en.js` e `images.js` se personaliza la página completa.

---

## 4. Cómo cambiar los datos del hotel

Los datos se reparten en dos tipos de archivo, para no tener que repetir lo que no cambia con el idioma:

- **`src/data/site.js`**: lo que es igual en todos los idiomas. Se cambia una sola vez.
- **`src/data/content.es.js` y `src/data/content.en.js`**: los textos. Tienen exactamente la misma estructura; cada cambio de texto se hace en los dos.

### Lo que va en `site.js`

| Bloque | Qué contiene |
| --- | --- |
| `defaultLanguage` | Idioma con el que se abre la página si el visitante no ha elegido uno y su navegador no está en un idioma disponible. |
| `hotel` | Nombre del hotel (aparece en el menú, el pie de página y el título de la pestaña). |
| `booking` | Modo de reserva, motor externo, límites de huéspedes y fechas precargadas. Ver la sección 7. |
| `rooms` | Datos de cada habitación: `id`, `image` (clave de `images.js`), `capacity`, `size` y `price` en cada moneda. |
| `location` | Dirección por partes (`street`, `postalCode`, `city`, `country`, `countryCode`), teléfono, correo, enlace al mapa y foto. La dirección visible se arma con esas partes. |
| `seo` | Dirección pública del sitio, imagen al compartir, `noindex`, tipo de negocio y coordenadas. Ver la sección 8. |
| `whatsapp` | Número de WhatsApp del hotel. Ver la sección 7. |
| `request` | Correo que recibe las solicitudes (`to`) y formas de enviarlas al hotel (`channels`: correo y/o WhatsApp). |

### Lo que va en `content.es.js` y `content.en.js`

| Bloque | Qué contiene |
| --- | --- |
| `meta` | Nombre del idioma, `locale` (formato de fechas y números), `ogLocale` (idioma para redes sociales) y `currency` (moneda en que se muestran los precios). |
| `hotel` | Descripción corta del hotel. |
| `seo` | Título y descripción para buscadores y vista previa al compartir. Ver la sección 8. |
| `nav`, `hero`, `finalCta`, `footer` | Menú, portada, cierre de la página y pie de página. |
| `search`, `roomsSection`, `request` | Textos del buscador, de la sección de habitaciones y de la página de reserva. |
| `rooms` | Nombre, descripción y tipo de cama de cada habitación. El `id` debe coincidir con el de `site.js`. |
| `services`, `gallery`, `location` | Servicios, galería (pies de foto) y textos de ubicación. |
| `whatsapp` | Texto del botón y mensaje inicial del chat. |
| `legal`, `cookies` | Textos legales y del banner de cookies. |

Los identificadores de sección (`habitaciones`, `servicios`, `galeria`, `ubicacion`, `reservar`, `inicio`) **no se traducen**: son iguales en los dos idiomas y los usan los enlaces del menú. No los cambies.

### Precios en pesos y en dólares

Cada habitación tiene un precio por noche en cada moneda, en `site.js`:

```js
{ id: 'jardin', image: 'roomGarden', capacity: 2, size: '28 m²', price: { COP: 380000, USD: 120 } },
```

- La versión en español muestra el precio en **COP** y la versión en inglés el de **USD**, según la `currency` de `meta` en cada archivo de idioma.
- **El precio en dólares no se convierte solo: lo fija el hotel.** Así el hotel decide su tarifa para extranjeros y no depende del cambio del día. Un criterio sencillo es dividir el precio en pesos entre el dólar vigente y redondear a un número limpio.
- Los precios de ejemplo (por noche) son de **COP 380.000, 620.000 y 980.000**, y de **USD 120, 195 y 310**. Salen de comparar tarifas públicas de hoteles colombianos (hoteles boutique, de playa y de campo con valores desde unos 70 hasta unos 200 dólares por noche, y cabañas para cuatro a siete personas entre 1 y 1,8 millones de pesos en temporada alta) y del dólar del 21 de octubre de 2026 (unos 3.164 pesos por dólar, TRM de 3.163,76). Son orientativos: cada hotel debe poner sus propias tarifas.
- Si cambias la moneda de un idioma (por ejemplo, euros), cambia `meta.currency` y añade ese precio a cada habitación en `site.js` (`price: { COP: ..., USD: ..., EUR: ... }`).
- Los impuestos y las condiciones de los precios se explican en `search.taxNote`, que también hay que ajustar en los dos idiomas.

### Otros cambios habituales

**Habitaciones.** Para añadir una, copia un bloque de `rooms` en `site.js` y otro en cada archivo de idioma, con un `id` único, y apunta `image` a una clave de `images.js`. Si dejas `rooms` vacío en `site.js`, la página muestra un aviso con un enlace para escribir al hotel.

**Fotos.** Las actuales son de Unsplash. Para usar fotos propias, súbelas a la carpeta `public/` y en `images.js` reemplaza la entrada por un objeto con `alt` (un texto por idioma) y `src`:

```js
roomGarden: {
  alt: { es: 'Habitación con cama de matrimonio y luz natural', en: 'Room with a double bed and natural light' },
  src: '/fotos/jardin.jpg',
},
```

Si una foto no carga, se muestra un fondo de color con el nombre de la habitación o el pie de foto.

**Textos «de ejemplo».** Cambia también los que dicen «de ejemplo» (en los dos idiomas), porque se ven en la web publicada:

- `search.taxNote` («Precios de ejemplo en pesos colombianos (COP), con impuestos incluidos.»): ajústalo a la realidad del hotel, por ejemplo si el IVA está incluido o no.
- `footer.sampleNotice`: déjalo vacío (`''`) y el aviso desaparece del pie de página.
- `services.intro` y `location.text`: tienen frases como «los horarios son de ejemplo» y «Dirección de ejemplo».

---

## 5. Idiomas

La página viene en **español** e **inglés**, con un selector **ES | EN** en la barra superior.

- **Idioma inicial.** Si el visitante ya eligió un idioma, se usa ese (se recuerda en su navegador). Si no, se usa el idioma de su navegador cuando es español o inglés. Si no, el de `defaultLanguage` en `site.js`.
- **Qué cambia al elegir el idioma:** todos los textos, la moneda y el formato de los precios y las fechas, los textos alternativos de las fotos, las políticas legales, el mensaje inicial de WhatsApp, el correo de la solicitud de reserva y el idioma declarado de la página (`lang`) para lectores de pantalla y buscadores.
- **Mantén los dos archivos sincronizados.** `content.es.js` y `content.en.js` tienen la misma estructura. Si cambias un texto en un idioma, cámbialo también en el otro.
- **Un solo idioma.** Si el hotel solo necesita uno, borra el que sobra de la lista `languages` en `src/data/content.js` y el selector desaparece solo. Si borras el español, cambia también `defaultLanguage` en `site.js`.

**Añadir otro idioma** (por ejemplo, francés):

1. Copia `src/data/content.es.js` como `content.fr.js` y traduce los textos. En `meta`, pon el código (`'fr'`), el nombre, las siglas, el `locale` (`'fr-FR'`) y la moneda.
2. Regístralo en `src/data/content.js`: importa el archivo y añádelo a `languages`.
3. En `site.js`, añade a cada habitación el precio en la moneda de ese idioma.
4. En `images.js`, añade el texto alternativo de cada foto en el nuevo idioma (`fr`).

Los textos legales de cada idioma deben revisarlos un abogado (ver la sección 6).

---

## 6. Cómo cambiar las secciones

- **Textos**: todo en `content.es.js` y `content.en.js`. Los textos con `{variable}` (por ejemplo `{price}` o `{nights}`) se rellenan solos: no borres las llaves.
- **Plurales**: `plurals` en cada archivo de idioma define las formas singular y plural («1 noche», «2 noches» / «1 night», «2 nights»).
- **Colores y tipografías**: `tailwind.config.js` define la paleta completa (`paper`, `ink`, `accent`, `sand`, `whatsapp`) y solo cinco tamaños de texto. Al cambiar un color ahí, cambia en toda la página. La plantilla usa solo Tailwind, sin archivos CSS propios.
- **Orden de las secciones**: se ordenan en `src/App.jsx`.
- **Textos legales**: privacidad, tratamiento de datos personales (basada en la Ley 1581 de 2012, de Colombia) y cookies, en español y en inglés. Son borradores de ejemplo. **Deben revisarlos un abogado antes de publicar.** Hay que poner el nombre real, el NIT, la dirección, el correo y la fecha de vigencia. Cada párrafo puede ser texto, un subtítulo (`{ heading: '...' }`) o una lista (`{ list: [...] }`).
- **Cookies**: el banner guarda la elección en `localStorage` con la clave `cookies.storageKey` de `site.js`. La plantilla **no carga ningún script de analítica ni de marketing**; si el hotel añade uno, debe activarlo solo según la categoría aceptada.

---

## 7. Reservas: totalmente personalizables

El flujo de reservas se adapta a como trabaje cada hotel. Los botones «Reservar» de las habitaciones y del buscador llevan siempre al mismo destino, que se elige en `booking.mode` (en `site.js`). Estas son las opciones:

| ¿Qué necesita el hotel? | Opción | Estado |
| --- | --- | --- |
| Recibir solicitudes por correo, sin pagar ni configurar nada | **A. Solicitud por correo** | Incluida y activa por defecto |
| Ya usa un motor de reservas en línea | **B. Motor externo** | Incluida; se configura en `site.js` |
| Que los huéspedes le escriban por WhatsApp | **C. Botón de WhatsApp** | Incluido; se activa poniendo el número |
| Recibir la solicitud de reserva completa por WhatsApp | **C+. Solicitud por WhatsApp** | Incluida; aparece sola si hay número de WhatsApp |
| Pagos en línea, calendario de disponibilidad real u otro sistema | **D. Integración a medida** | Se presupuesta aparte |

### Opción A: solicitud por correo (por defecto)

`booking.mode: 'form'`. El botón «Reservar» abre la página `#/reserva` con las fechas, los huéspedes y la habitación ya cargados. El huésped deja su nombre, correo y teléfono, autoriza el tratamiento de sus datos y pulsa **Enviar por correo**. Se abre su programa de correo con la solicitud ya redactada (habitación, tarifa por noche, fechas, noches, huéspedes, total estimado y sus datos) hacia el correo del hotel. Si el hotel tiene WhatsApp, junto a ese botón aparece **Enviar por WhatsApp** (opción C+).

- El correo que recibe las solicitudes es `request.to` en `site.js`. Si lo dejas vacío (`''`), se usa `location.email`.
- La solicitud se redacta **en el idioma y la moneda que el huésped está viendo**: un huésped en inglés recibe el total en dólares.
- Los textos de la página y el mensaje del correo están en `request` en cada archivo de idioma. Las variables del mensaje son `room`, `rate` (tarifa por noche), `checkIn`, `checkOut`, `nights`, `guests`, `total`, `name`, `email`, `phone` y `notes`.
- No hay servidor, no se guarda ningún dato y no se cobra nada: el hotel confirma la disponibilidad por correo.
- Si el huésped no tiene programa de correo configurado, la pantalla de confirmación tiene los botones **Abrir el correo** y **Copiar mensaje**, para que pueda enviarlo desde donde quiera.
- La página usa el hash de la URL (`#/reserva`), así que funciona en cualquier hosting estático sin configurar redirecciones.

### Opción B: motor de reservas externo

Si el hotel ya tiene un motor de reservas, el botón «Reservar» puede llevar directamente a él. En `booking`, dentro de `site.js`:

```js
// Antes
mode: 'form',

// Después
mode: 'external',
url: 'https://reservas.mihotel.com/motor',
params: { checkIn: 'checkin', checkOut: 'checkout', guests: 'adultos', room: 'habitacion', language: 'lang', currency: 'moneda', price: 'tarifa', total: 'total' },
```

- `url` es el enlace del motor.
- `params` dice **cómo se llama cada dato en el motor**: a la izquierda, el dato de la plantilla; a la derecha, el nombre del parámetro que espera el motor. Los datos disponibles son `checkIn`, `checkOut`, `guests`, `room`, `language` (`es` o `en`), `currency` (`COP` o `USD`), `price` (precio por noche) y `total` (precio de toda la estancia). Los precios van como número sin formato, en la moneda del idioma que el visitante está viendo (por ejemplo `price=620000` y `total=1240000` en español, `price=195` y `total=390` en inglés). Así el huésped llega con sus fechas, su habitación, su idioma, su moneda y el precio ya cargados. Deja fuera los que el motor no use: muchos motores calculan su propio precio y solo necesitan las fechas.
- Si el motor no acepta parámetros, pon `params: null` y se enlaza la URL tal cual.
- Los nombres exactos de los parámetros los da el proveedor del motor. Si el motor funciona con un widget incrustado o con una API, es una integración a medida (opción D).

### Opción C: botón flotante de WhatsApp

En la esquina inferior derecha de todas las páginas hay un botón verde de WhatsApp que rebota sin parar para llamar la atención. Al pulsarlo se abre el chat con el hotel, con un mensaje inicial ya escrito **en el idioma que el visitante está viendo**. Se puede combinar con cualquiera de las otras opciones.

- El número está en `whatsapp` en `site.js`:

```js
// Antes
number: '570000000000',

// Después
number: '573001234567',
```

- `number` es el **número de WhatsApp del hotel**, con código de país y solo dígitos, sin `+`, espacios ni guiones. El que trae la plantilla es de ejemplo y no funciona.
- El mensaje inicial (`message`, con la variable `{hotel}`) y el nombre accesible del botón (`label`) están en `whatsapp` en cada archivo de idioma.
- Si dejas `number` vacío (`''`), el botón no se muestra: útil para un hotel que no usa WhatsApp.
- Mientras el banner de cookies está visible, el botón se coloca encima de él, y después baja a la esquina.
- El rebote se detiene al pasar el cursor o enfocar el botón, y desaparece para quien tiene activada la opción «reducir movimiento» en su dispositivo. La animación se ajusta en `tailwind.config.js` (`whatsapp-bounce`) y el color en `whatsapp`.

### Opción C+: solicitud de reserva por WhatsApp

Si en `whatsapp.number` hay un número, la página de reserva ofrece un segundo botón, **Enviar por WhatsApp**, junto al de correo. Al pulsarlo se valida el formulario y se abre WhatsApp con la solicitud ya escrita, que incluye la habitación, la **tarifa por noche**, las fechas, los huéspedes, el **total estimado** y los datos del huésped, en el idioma y la moneda que está viendo. El huésped la envía con un toque. Funciona igual que el correo: sin servidor y sin guardar datos, y la pantalla de confirmación permite reabrir WhatsApp o copiar el mensaje.

- Se configura en `request.channels` de `site.js`, que es la lista de formas de enviar y su orden (el primero es el botón principal):

```js
channels: ['email', 'whatsapp'],   // las dos (por defecto)
channels: ['whatsapp', 'email'],   // WhatsApp como botón principal
channels: ['email'],               // solo correo
channels: ['whatsapp'],            // solo WhatsApp
```

- Si `whatsapp.number` está vacío, WhatsApp no aparece aunque esté en la lista, y se ofrece solo el correo.
- El texto del mensaje es el de `request.email.body` de cada archivo de idioma, el mismo del correo.

### Notas sobre las reservas

- **Los datos de la solicitud no se guardan en la web.** Quedan en el correo (o en el chat) del hotel y del huésped.
- **Prueba siempre el flujo antes de entregar:** envía una solicitud de prueba en español y otra en inglés, desde un móvil y desde un ordenador, y comprueba que llegan al correo real del hotel.
- **Los precios son orientativos.** El total del resumen es `precio por noche × noches`, en la moneda del idioma elegido. Si el hotel tiene tarifas por temporada, descuentos o impuestos adicionales, el cálculo se ajusta en `src/lib/booking.js` (personalización).

---

## 8. SEO y vista previa al compartir

La plantilla prepara lo que necesitan los buscadores y las redes sociales, con los textos de cada idioma:

- **Título y descripción** de la página.
- **Vista previa al compartir** el enlace en WhatsApp, Facebook, LinkedIn o X (título, descripción e imagen de 1200 × 630 px).
- **Datos estructurados** de tipo hotel (schema.org, JSON-LD): nombre, descripción, dirección, teléfono, correo, rango de precios en la moneda del idioma y servicios. Solo incluyen lo que la página muestra y se actualizan solos si cambias los datos del hotel.
- **`robots.txt`** y **`sitemap.xml`**, generados al compilar.
- Idioma de la página (`lang`), canonical e instrucciones de indexación.

Las etiquetas se escriben en el HTML al compilar (en el idioma por defecto), para que las lean también los buscadores y redes que no ejecutan JavaScript, y se actualizan en el navegador cuando el visitante cambia de idioma. El `index.html` ya no lleva título ni descripción propios: salen de los archivos de contenido.

### Qué hay que configurar

1. **Dirección pública del sitio.** En `site.js`, `seo.siteUrl`, sin barra final (por ejemplo `'https://www.mihotel.com'`). Con ella se generan el canonical, `og:url` y el `sitemap.xml`. Si la dejas vacía, esas partes se omiten.
2. **Título y descripción.** En `seo` de `content.es.js` y `content.en.js`. El título debe tener entre 50 y 60 caracteres (con el nombre del hotel) y la descripción entre 120 y 160, y deben describir lo que la página muestra de verdad.
3. **Imagen al compartir.** En `seo.ogImage`, la ruta de una imagen de `public/` (por ejemplo `'/og-image.jpg'`) de **1200 × 630 px y menos de 300 KB**. Si la dejas vacía se usa la foto `hero` recortada a ese tamaño.
4. **Tipo de negocio.** `seo.schemaType`: `'Hotel'` por defecto; también sirven `'Resort'`, `'BedAndBreakfast'`, `'Hostel'` o `'Motel'`.
5. **Mapa (opcional).** `seo.geo` con las coordenadas, por ejemplo `{ latitude: 10.4236, longitude: -75.5453 }`.
6. **Dirección, teléfono y correo reales** en `location` de `site.js`: también alimentan los datos estructurados.

**Para una demo o una prueba**, pon `seo.noindex: true`: la página lleva `noindex` y el `robots.txt` bloquea todo, para que no se indexe con datos de ejemplo.

### Idiomas y buscadores

Los dos idiomas viven en la **misma dirección** y se cambian con el selector, así que los buscadores indexan el idioma por defecto (`defaultLanguage` en `site.js`). Si el hotel quiere posicionarse por separado en inglés hace falta una dirección por idioma (por ejemplo `/en/`): es una personalización que se presupuesta aparte.

### Después de publicar

1. Da de alta el sitio en **Google Search Console** y envía `https://tu-dominio/sitemap.xml`.
2. Comprueba los datos estructurados con la *Prueba de resultados enriquecidos* de Google.
3. Comprueba la vista previa al compartir con el depurador de Facebook o el *Post Inspector* de LinkedIn. WhatsApp guarda la vista previa en caché y puede tardar en actualizarla.
4. Mide la versión móvil en **PageSpeed Insights** (LCP, INP y CLS).
5. Crea la ficha del hotel en **Google Business Profile** con el mismo nombre, dirección y teléfono que la web.

---

## 9. Antes de publicar

Lista de verificación:

- [ ] Nombre, habitaciones y datos de `site.js` sustituidos por los del hotel.
- [ ] Descripción, textos, servicios y galería sustituidos en `content.es.js` **y** en `content.en.js`.
- [ ] Precios reales de cada habitación en **COP y USD** (`price` en `site.js`).
- [ ] Dirección, teléfono, correo y enlace al mapa reales en `location` de `site.js`.
- [ ] Modo de reserva elegido (`booking.mode`) y, si es correo, `request.to` con el correo real.
- [ ] Si es motor externo: `booking.url` y `booking.params` reales, y probado con fechas de prueba.
- [ ] Solicitud de reserva de prueba enviada en español y en inglés, por correo y por WhatsApp, desde un móvil real, y recibida por el hotel.
- [ ] Número de WhatsApp real en `whatsapp.number` y probado desde un móvil (o vacío si el hotel no usa WhatsApp).
- [ ] Textos «de ejemplo» eliminados en los dos idiomas (`search.taxNote`, `footer.sampleNotice`, `services.intro`, `location.text`).
- [ ] Textos legales revisados **por un abogado** en los dos idiomas, con el nombre, el NIT, la dirección, el correo y la fecha de vigencia reales.
- [ ] Las fotos son del hotel, o tienes derecho a usarlas, con su texto alternativo en español e inglés, y los créditos de fotógrafos están en `photoCredits` de `images.js`.
- [ ] `seo.siteUrl` con la dirección real del sitio y `seo.noindex` en `false`.
- [ ] Título (50-60 caracteres) y descripción (120-160) reales en `seo` de los dos idiomas.
- [ ] Imagen para compartir de 1200 × 630 px (`seo.ogImage`) y vista previa comprobada en WhatsApp.
- [ ] Icono de la pestaña (`public/favicon.svg`) cambiado.
- [ ] `npm run lint` y `npm run build` terminan sin errores, y `dist` incluye `robots.txt` (y `sitemap.xml` si hay `siteUrl`).
- [ ] En el sitio publicado, `/`, `/#habitaciones` y `/#/reserva` se ven como se espera, y el selector ES | EN cambia textos y precios.

---

## 10. Cómo publicar

El sitio se compila con `npm run build` y se publica la carpeta **`dist`**. Sirve cualquier hosting estático (Cloudflare Pages, Netlify, Vercel). Con **Cloudflare Pages** (tiene plan gratuito):

- **Framework preset:** `None`.
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node:** versión 20.19 o superior (se puede fijar con la variable de entorno `NODE_VERSION`, por ejemplo `22`).

No hacen falta redirecciones ni variables de entorno: la página de reserva y el idioma funcionan sin configurar el servidor.

---

## 11. Soporte y próximos pasos

El soporte gratuito del proveedor dura **[PLAZO DE SOPORTE]** desde la entrega, con respuesta en **[TIEMPO DE RESPUESTA]**. El mantenimiento posterior se contrata aparte. La personalización de textos, fotos, colores, tarifas, traducciones a otros idiomas y contenido legal, y las integraciones (motor de reservas externo, pagos u otros sistemas), se presupuestan por separado.

**Si algo se rompe:**

1. **La web publicada se ve mal después de un cambio.** Restaura un despliegue anterior desde el panel de Cloudflare Pages (pestaña *Deployments*).
2. **`npm run build` da error.** El mensaje indica el archivo y la línea. Los errores más comunes son una comilla o llave sin cerrar, o una coma que falta en un archivo de contenido.
3. **La página se queda en blanco o da un error al abrirla.** Casi siempre es una diferencia entre `content.es.js` y `content.en.js`, o una habitación de `site.js` sin su traducción, o sin precio en la moneda de un idioma. Revisa que ambos archivos tengan los mismos bloques y que cada habitación aparezca en los tres sitios.
4. **Un precio aparece como `$0`.** A esa habitación le falta el precio en la moneda de ese idioma en `price` de `site.js`.
5. **Un cambio no aparece en local.** Detén `npm run dev`, vuelve a ejecutarlo y recarga con `Ctrl + F5`.
6. **El botón «Reservar» no abre el correo.** El huésped no tiene programa de correo configurado. En la pantalla de confirmación puede copiar el mensaje y enviarlo desde su correo web.
7. **La página no cambia de idioma.** El idioma elegido se recuerda en el navegador; para probar como un visitante nuevo, borra la clave `language` de `localStorage` o abre una ventana privada.
8. **Una foto no carga.** Si es de Unsplash, comprueba que el id sea correcto en `images.js`; si es propia, que la ruta exista en `public/`. Mientras tanto se muestra un fondo de color con el nombre.
9. **Un comando no funciona.** Verifica `node -v` y que estás dentro de la carpeta del proyecto.
