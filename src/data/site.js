// Datos compartidos por todos los idiomas: lo que NO cambia al traducir la página.
// Los textos están en content.es.js y content.en.js.

export const site = {
  // Idioma con el que se abre la página si el visitante no ha elegido uno y su navegador no está en un idioma disponible.
  // Si el navegador del visitante está en un idioma disponible (es, en), se usa ese.
  defaultLanguage: 'es',
  // Clave de localStorage donde se recuerda el idioma elegido.
  languageStorageKey: 'language',

  hotel: {
    name: 'Hotel Ejemplo',
  },

  booking: {
    // 'form': los botones «Reservar» abren la página de solicitud propia (request en los archivos de idioma).
    // 'external': enlazan al motor de reservas externo de `url`.
    mode: 'form',
    // Motor de reservas externo (solo con mode: 'external'). Si `params` es null, se enlaza la URL tal cual.
    // Además de checkIn, checkOut, guests y room, `params` admite `language`, `currency`, `price` (por noche) y `total`
    // (de la estancia) si el motor los acepta. El precio va en la moneda del idioma, como número sin formato.
    url: 'https://example.com/reservar',
    params: { checkIn: 'entrada', checkOut: 'salida', guests: 'huespedes', room: 'habitacion' },
    minGuests: 1,
    maxGuests: 6,
    defaultGuests: 2,
    // Fechas precargadas: entrada dentro de N días y estancia de M noches.
    defaultCheckInOffset: 1,
    defaultNights: 2,
  },

  // Habitaciones. `image` es una clave de images.js. `price` es el precio por noche en cada moneda: cada idioma
  // muestra la moneda de su `meta.currency` (español: COP, inglés: USD). Los precios en dólares se fijan a mano.
  // El `id` debe coincidir con el de los archivos de idioma.
  rooms: [
    { id: 'jardin', image: 'roomGarden', capacity: 2, size: '28 m²', price: { COP: 380000, USD: 120 } },
    { id: 'terraza', image: 'roomTerrace', capacity: 3, size: '42 m²', price: { COP: 620000, USD: 195 } },
    { id: 'casa', image: 'roomFamily', capacity: 6, size: '64 m²', price: { COP: 980000, USD: 310 } },
  ],

  // La dirección se escribe por partes: con ellas se arma el texto que se ve en la página y los datos estructurados para buscadores.
  location: {
    street: 'Calle del Ejemplo 12',
    postalCode: '000000',
    city: 'Ciudad Ejemplo',
    country: 'Colombia',
    countryCode: 'CO', // código de país de 2 letras (ISO 3166-1)
    phone: '+57 000 000 0000',
    email: 'reservas@example.com',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calle+del+Ejemplo+12',
    image: 'location',
  },

  // Botón flotante de WhatsApp (abajo a la derecha, con rebote). Si `number` está vacío, el botón no se muestra.
  // Número del hotel: solo dígitos, con código de país y sin «+» (por ejemplo 573001234567). Este es de ejemplo.
  whatsapp: {
    number: '570000000000',
  },

  // Buscadores y vista previa al compartir el enlace (WhatsApp, Facebook, LinkedIn…).
  // El título y la descripción de cada idioma están en `seo` de content.es.js y content.en.js.
  seo: {
    // Dirección pública del sitio, sin barra final: 'https://www.mihotel.com'. Es necesaria para la URL canónica, el mapa
    // del sitio (sitemap.xml) y las imágenes propias al compartir. Si está vacía, esas partes se omiten.
    siteUrl: '',
    // Imagen al compartir: ruta dentro de public/ (por ejemplo '/og-image.jpg'), de 1200 × 630 px y menos de 300 KB.
    // Si está vacía se usa la foto `hero` de images.js recortada a ese tamaño.
    ogImage: '',
    // true: no indexar el sitio (para demos o pruebas). Añade noindex y bloquea todo en robots.txt.
    noindex: false,
    // Tipo de negocio de schema.org: 'Hotel', 'Resort', 'BedAndBreakfast', 'Hostel', 'Motel'…
    schemaType: 'Hotel',
    // Coordenadas del hotel para el mapa de Google, por ejemplo { latitude: 10.4236, longitude: -75.5453 }. null = no se envían.
    geo: null,
  },

  request: {
    // Correo que recibe las solicitudes de reserva. Si está vacío se usa location.email.
    to: '',
    // Formas de enviar la solicitud que se ofrecen al huésped, en este orden: 'email' y/o 'whatsapp'.
    // WhatsApp solo aparece si whatsapp.number tiene un número. El primero es el botón principal.
    channels: ['email', 'whatsapp'],
  },

  cookies: {
    storageKey: 'cookie-consent',
  },
}
