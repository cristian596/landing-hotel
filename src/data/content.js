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
  // 'form': los botones «Reservar» abren la página de solicitud propia (request, más abajo).
  // 'external': enlazan al motor de reservas externo de `url`.
  mode: 'form',
  // Motor de reservas externo (solo con mode: 'external'). Si `params` es null, se enlaza la URL tal cual.
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

// Botón flotante de WhatsApp (abajo a la derecha, con rebote). Si `number` está vacío, el botón no se muestra.
export const whatsapp = {
  // Número de WhatsApp del hotel: solo dígitos, con código de país y sin «+» (por ejemplo 573001234567). Este es de ejemplo.
  number: '570000000000',
  label: 'Escribir por WhatsApp',
  // Mensaje que se escribe al abrir el chat. Variable: {hotel}.
  message: 'Hola, quisiera información sobre las reservas en {hotel}.',
}

// Página de solicitud de reserva (ruta #/reserva). Se usa cuando booking.mode es 'form'.
// La solicitud se envía por correo: se abre el programa de correo del huésped con el mensaje ya redactado.
export const request = {
  id: 'reserva',
  // Correo que recibe las solicitudes. Si está vacío se usa location.email.
  to: '',
  backLabel: 'Volver al inicio',
  backHref: '#inicio',
  title: 'Solicita tu reserva',
  intro:
    'Elige tu estancia y déjanos tus datos. Te confirmaremos la disponibilidad por correo; no se hace ningún cargo ahora.',
  stayTitle: 'Tu estancia',
  guestTitle: 'Tus datos',
  roomLabel: 'Habitación',
  roomOption: '{room} · {price} / noche',
  nameLabel: 'Nombre y apellidos',
  emailLabel: 'Correo electrónico',
  phoneLabel: 'Teléfono (opcional)',
  notesLabel: 'Comentarios (opcional)',
  notesHint: 'Hora de llegada, camas, alergias, celebraciones…',
  consent: {
    before: 'Autorizo el tratamiento de mis datos personales según la ',
    link: 'política de tratamiento de datos personales',
    after: ' para gestionar esta solicitud.',
  },
  submit: 'Enviar solicitud',
  summaryTitle: 'Resumen',
  errorsTitle: 'Revisa estos campos',
  errors: {
    roomRequired: 'Elige una habitación.',
    overCapacity: 'Esta habitación admite como máximo {guests}.',
    nameRequired: 'Escribe tu nombre.',
    emailInvalid: 'Escribe un correo válido, por ejemplo nombre@correo.com.',
    consentRequired: 'Autoriza el tratamiento de tus datos personales para enviar la solicitud.',
  },
  // Mensaje que se redacta en el correo. Variables: room, checkIn, checkOut, nights, guests, total, name, email, phone, notes.
  email: {
    subject: 'Solicitud de reserva: {room}, {checkIn} - {checkOut}',
    body: [
      'Hola, quisiera solicitar la siguiente reserva:',
      '',
      'Habitación: {room}',
      'Entrada: {checkIn}',
      'Salida: {checkOut}',
      'Estancia: {nights}',
      'Huéspedes: {guests}',
      'Total estimado: {total}',
      '',
      'Nombre: {name}',
      'Correo: {email}',
      'Teléfono: {phone}',
      '',
      'Comentarios: {notes}',
      '',
      'Autorizo el tratamiento de mis datos personales según la política de tratamiento de datos del hotel.',
    ],
  },
  success: {
    title: 'Tu solicitud está lista para enviar',
    text: 'Hemos abierto tu programa de correo con la solicitud ya redactada. Pulsa «Enviar» allí para que llegue a {email}. El hotel te confirmará la disponibilidad por correo.',
    notOpened: '¿No se abrió el correo? Ábrelo de nuevo o copia el mensaje y envíalo a {email}.',
    openMail: 'Abrir el correo',
    messageLabel: 'Mensaje',
    copy: 'Copiar mensaje',
    copied: 'Mensaje copiado',
    edit: 'Editar solicitud',
    backHome: 'Volver al inicio',
  },
}

export const footer = {
  sampleNotice: 'Textos, precios y datos de contacto de ejemplo.',
  contactTitle: 'Contacto',
  legalTitle: 'Legal',
  privacyLabel: 'Política de privacidad',
  dataTreatmentLabel: 'Tratamiento de datos personales',
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
  // Texto de ejemplo basado en la Ley 1581 de 2012 y el Decreto 1377 de 2013 (Colombia). Cada elemento de `body` es un
  // párrafo (texto), un subtítulo ({ heading }) o una lista ({ list }).
  dataTreatment: {
    title: 'Política de tratamiento de datos personales',
    body: [
      'Texto de ejemplo basado en la Ley 1581 de 2012 y sus decretos reglamentarios (Colombia). Sustitúyelo por la política real del hotel, redactada o revisada por un profesional.',
      { heading: '1. Responsable del tratamiento' },
      'Hotel Ejemplo, NIT 000.000.000-0, Calle del Ejemplo 12, 00000 Ciudad Ejemplo. Correo: reservas@example.com. Teléfono: +00 000 000 000.',
      { heading: '2. Datos que recolectamos' },
      'Nombre, correo electrónico, teléfono (opcional), fechas de estancia, número de huéspedes, habitación elegida y los comentarios que escribas en la solicitud. No te pedimos datos sensibles; evita incluirlos en los comentarios.',
      { heading: '3. Finalidades del tratamiento' },
      {
        list: [
          'Gestionar tu solicitud de reserva y confirmarte la disponibilidad.',
          'Contactarte sobre tu estancia: cambios, cancelaciones e indicaciones de llegada.',
          'Atender tus consultas, peticiones y reclamos.',
          'Cumplir obligaciones legales, contables y de registro de huéspedes.',
        ],
      },
      'No usaremos tus datos para finalidades distintas sin pedirte una nueva autorización.',
      { heading: '4. Autorización' },
      'Al marcar la casilla del formulario de reserva autorizas de forma previa, expresa e informada el tratamiento de tus datos para estas finalidades. Conservamos prueba de la autorización. Puedes revocarla en cualquier momento, salvo que exista un deber legal o contractual de conservar los datos.',
      { heading: '5. Tus derechos como titular' },
      {
        list: [
          'Conocer, actualizar y rectificar tus datos personales.',
          'Solicitar prueba de la autorización que nos diste.',
          'Ser informado sobre el uso que se ha dado a tus datos.',
          'Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley, una vez agotado el trámite ante el hotel.',
          'Revocar la autorización y solicitar la supresión de tus datos cuando no se respeten los principios, derechos y garantías legales.',
          'Acceder de forma gratuita a los datos que hayan sido objeto de tratamiento.',
        ],
      },
      { heading: '6. Área de atención y procedimiento' },
      'Las peticiones, consultas y reclamos los atiende el área de Reservas. Escribe a reservas@example.com con tu nombre, un medio de contacto, la descripción de tu consulta o reclamo y los documentos que quieras hacer valer.',
      'Consultas: las respondemos en un máximo de 10 días hábiles desde su recibo. Si no es posible, te informaremos los motivos y la nueva fecha, que no superará 5 días hábiles adicionales.',
      'Reclamos para corregir, actualizar o suprimir datos: los resolvemos en un máximo de 15 días hábiles desde el día siguiente a su recibo. Si no es posible, te informaremos los motivos y la nueva fecha, que no superará 8 días hábiles adicionales. Si el reclamo está incompleto, te pediremos que lo completes en los 5 días hábiles siguientes.',
      { heading: '7. Seguridad y proveedores' },
      'Aplicamos medidas razonables para proteger tus datos. Podemos compartirlos con proveedores que nos prestan servicios (alojamiento web, correo electrónico), que los tratan solo por nuestra cuenta y para estas finalidades. Texto de ejemplo: indica aquí los proveedores reales y si hay transferencia internacional.',
      { heading: '8. Vigencia' },
      'Esta política entra en vigor el 00 de mes de 0000. Conservamos los datos durante el tiempo necesario para las finalidades descritas y las obligaciones legales. Si la política cambia de forma sustancial, te lo comunicaremos antes de aplicar los cambios.',
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
