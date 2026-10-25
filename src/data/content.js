// Todo el contenido de la landing. Cambia los textos aquí: los componentes no contienen texto propio.
// Los datos son de ejemplo: nombre, dirección, teléfono, precios y textos legales deben sustituirse.
// En las plantillas, {variable} se reemplaza por su valor (por ejemplo {count}, {price}).

export const hotel = {
  name: 'Hotel Ejemplo',
  description: 'Un hotel pequeño entre madera, piscina y mar. Descripción de ejemplo para la plantilla.',
}

// Enlaces de la barra de navegación. Cada href apunta al id de su sección.
export const nav = {
  label: 'Principal',
  links: [
    { label: 'Habitaciones', href: '#habitaciones' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Ubicación', href: '#ubicacion' },
  ],
  cta: { label: 'Reservar', href: '#reservar' },
  menuOpen: 'Menú',
  menuClose: 'Cerrar',
  skipLink: 'Saltar al contenido',
}

export const booking = {
  // Motor de reservas externo. Si `params` es null, se enlaza la URL tal cual.
  url: 'https://example.com/reservar',
  params: { checkIn: 'entrada', checkOut: 'salida', guests: 'huespedes', room: 'habitacion' },
  currency: 'EUR',
  locale: 'es-ES',
  minGuests: 1,
  maxGuests: 6,
  defaultGuests: 2,
  // Fechas precargadas: entrada dentro de N días y estancia de M noches.
  defaultCheckInOffset: 1,
  defaultNights: 2,
}

export const plurals = {
  night: { one: '{count} noche', other: '{count} noches' },
  guest: { one: '{count} huésped', other: '{count} huéspedes' },
}

export const hero = {
  id: 'inicio',
  title: 'Un refugio entre madera y mar',
  subtitle: 'Habitaciones tranquilas, piscina entre palmeras y cocina de temporada.',
  cta: { label: 'Ver disponibilidad', href: '#reservar' },
}

export const search = {
  id: 'reservar',
  title: 'Consulta tu estancia',
  intro: 'Elige fechas y número de huéspedes. El precio total de cada habitación se calcula al momento.',
  checkInLabel: 'Entrada',
  checkOutLabel: 'Salida',
  guestsLabel: 'Huéspedes',
  decreaseGuests: 'Quitar un huésped',
  increaseGuests: 'Añadir un huésped',
  resultsTitle: 'Precio para tus fechas',
  summary: '{nights} · {guests}',
  perNight: '{price} / noche',
  nightsTimesPrice: '{nights} × {price}',
  totalLabel: 'Total',
  taxNote: 'Precios de ejemplo con impuestos incluidos.',
  bookLabel: 'Reservar',
  bookRoomLabel: 'Reservar {room}',
  unavailableLabel: 'No disponible',
  overCapacity: 'Esta habitación admite como máximo {guests}.',
  errors: {
    missingDates: 'Elige la fecha de entrada y la de salida.',
    pastCheckIn: 'La fecha de entrada no puede ser anterior a hoy.',
    checkOutBeforeCheckIn: 'La salida debe ser al menos un día después de la entrada.',
    guestsRange: 'Indica entre {min} y {max} huéspedes.',
  },
  fixToSee: 'Corrige los datos para ver el precio total.',
}

export const roomsSection = {
  id: 'habitaciones',
  title: 'Habitaciones',
  intro: 'Tres maneras de quedarse. Todas con ropa de cama de lino, ducha amplia y silencio por la noche.',
  capacity: 'Hasta {guests}',
  totalForStay: 'Total para {nights}: {price}',
  empty: {
    title: 'Pronto publicaremos nuestras habitaciones',
    text: 'Mientras tanto, escríbenos y te ayudamos a encontrar la estancia que buscas.',
    cta: 'Escribir al hotel',
  },
}

// Habitaciones. `image` es una clave de src/data/images.js. Precio por noche en la moneda de `booking`.
export const rooms = [
  {
    id: 'jardin',
    name: 'Habitación Jardín',
    description:
      'Planta baja con salida a un pequeño jardín privado. Madera clara, cama de matrimonio y luz de mañana.',
    pricePerNight: 120,
    capacity: 2,
    bed: 'Cama de matrimonio',
    size: '28 m²',
    image: 'roomGarden',
  },
  {
    id: 'terraza',
    name: 'Suite Terraza',
    description:
      'Ventanales de suelo a techo que se abren a una terraza con tumbonas. Zona de estar y bañera independiente.',
    pricePerNight: 185,
    capacity: 3,
    bed: 'Cama extragrande y sofá cama',
    size: '42 m²',
    image: 'roomTerrace',
  },
  {
    id: 'casa',
    name: 'Casa Familiar',
    description:
      'Dos dormitorios, salón con cocina pequeña y porche a la sombra. Pensada para familias o grupos de amigos.',
    pricePerNight: 260,
    capacity: 6,
    bed: 'Dos dormitorios y litera',
    size: '64 m²',
    image: 'roomFamily',
  },
]

export const services = {
  id: 'servicios',
  title: 'Servicios',
  intro:
    'Lo necesario para no pensar en nada más. Algunos servicios se reservan en recepción; los horarios son de ejemplo.',
  items: [
    { name: 'Desayuno de temporada', description: 'Pan del día, fruta local y café, servido en la terraza de 7:30 a 11:00.' },
    { name: 'Piscina exterior', description: 'Agua templada, tumbonas y toallas de piscina de 9:00 a 20:00.' },
    { name: 'Restaurante', description: 'Cocina de producto cercano para comidas y cenas. Se recomienda reservar mesa.' },
    { name: 'Spa y masajes', description: 'Sala de tratamientos con masajes bajo reserva previa.' },
    { name: 'Traslados', description: 'Recogida en estación o aeropuerto bajo petición.' },
    { name: 'Recepción 24 horas', description: 'Siempre hay alguien para ayudarte, también de noche.' },
  ],
}

// Galería. El orden define la posición en el mosaico.
export const gallery = {
  id: 'galeria',
  title: 'Galería',
  items: [
    { image: 'galleryPool', caption: 'La piscina' },
    { image: 'galleryDish', caption: 'Cena en el restaurante' },
    { image: 'galleryLinen', caption: 'Ropa de cama de lino' },
    { image: 'galleryView', caption: 'Vistas desde la suite' },
    { image: 'galleryBeach', caption: 'La playa al amanecer' },
    { image: 'galleryBath', caption: 'Baño con vistas' },
    { image: 'galleryTerrace', caption: 'Terraza junto al agua' },
  ],
}

export const location = {
  id: 'ubicacion',
  title: 'Cómo llegar',
  text: 'A diez minutos a pie de la playa y a veinte en coche de la estación. Dirección de ejemplo.',
  address: ['Calle del Ejemplo 12', '00000 Ciudad Ejemplo', 'País'],
  phone: '+00 000 000 000',
  email: 'reservas@example.com',
  phoneLabel: 'Teléfono',
  emailLabel: 'Correo',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calle+del+Ejemplo+12',
  mapsLabel: 'Abrir en el mapa',
  image: 'location',
}

export const finalCta = {
  title: 'Tu habitación te está esperando',
  text: 'Elige fechas, mira el precio y reserva en un minuto.',
  cta: { label: 'Reservar ahora', href: '#reservar' },
}

export const footer = {
  sampleNotice: 'Textos, precios y datos de contacto de ejemplo.',
  contactTitle: 'Contacto',
  legalTitle: 'Legal',
  privacyLabel: 'Política de privacidad',
  cookiesLabel: 'Política de cookies',
  cookieSettingsLabel: 'Configuración de cookies',
  rights: 'Todos los derechos reservados.',
  photosLabel: 'Fotos: Unsplash',
  photosUrl: 'https://unsplash.com',
}

export const legal = {
  closeLabel: 'Cerrar',
  privacy: {
    title: 'Política de privacidad',
    body: [
      'Texto de ejemplo. Sustitúyelo por la política de privacidad real del hotel, redactada o revisada por un profesional.',
      'Responsable del tratamiento: Hotel Ejemplo, Calle del Ejemplo 12, 00000 Ciudad Ejemplo.',
      'Datos que tratamos: los que nos envías al escribirnos o al reservar (nombre, correo, teléfono y fechas de estancia), con la finalidad de gestionar tu reserva y responder a tus consultas.',
      'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición y portabilidad escribiendo a reservas@example.com.',
    ],
  },
  cookies: {
    title: 'Política de cookies',
    body: [
      'Texto de ejemplo. Sustitúyelo por la política de cookies real del sitio.',
      'Cookies necesarias: guardan tus preferencias de cookies y no se pueden desactivar.',
      'Cookies analíticas: nos ayudan a entender qué páginas se visitan. Solo se activan si las aceptas.',
      'Cookies de marketing: permiten mostrar anuncios relevantes en otros sitios. Solo se activan si las aceptas.',
      'Puedes cambiar tu elección en cualquier momento desde «Configuración de cookies» en el pie de página.',
    ],
  },
}

export const cookies = {
  storageKey: 'cookie-consent',
  bannerText: 'Usamos cookies necesarias para que el sitio funcione y, si nos dejas, cookies analíticas y de marketing.',
  policyLink: 'Más información',
  acceptAll: 'Aceptar',
  rejectAll: 'Rechazar',
  configure: 'Configurar',
  settingsTitle: 'Configuración de cookies',
  settingsIntro: 'Elige qué cookies aceptas. Puedes cambiarlo cuando quieras.',
  save: 'Guardar preferencias',
  alwaysOn: 'Siempre activas',
  categories: [
    { id: 'necessary', label: 'Necesarias', description: 'Guardan tu elección de cookies.', required: true },
    { id: 'analytics', label: 'Analíticas', description: 'Miden las visitas de forma agregada.' },
    { id: 'marketing', label: 'Marketing', description: 'Personalizan anuncios en otros sitios.' },
  ],
}
