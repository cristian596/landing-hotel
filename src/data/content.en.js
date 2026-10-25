// Texts of the landing page in ENGLISH. Same structure as content.es.js: keep both files in sync.
// Everything here is sample data. Shared data (name, contact, prices, capacity, photos, booking mode) is in site.js.
// In the templates, {variable} is replaced by its value (for example {count}, {price}).

// Language: `locale` formats dates and numbers; `currency` is the currency in which prices are shown.
const meta = { code: 'en', name: 'English', short: 'EN', locale: 'en-US', ogLocale: 'en_US', currency: 'USD' }

const language = { switchLabel: 'Language' }

// Search engines and link previews. Title: 50-60 characters. Description: 120-160. Describe what the page really shows.
const seo = {
  title: 'Hotel Ejemplo | Boutique hotel with a pool by the sea',
  description:
    'Quiet rooms, a pool among palm trees and seasonal cooking. Check availability, see the total price and book your stay in minutes.',
}

const hotel = {
  description: 'A small hotel between timber, pool and sea. Sample description for the template.',
}

// Navigation bar links. Each href points to the id of its section (the ids are the same in every language).
const nav = {
  label: 'Main',
  links: [
    { label: 'Rooms', href: '#habitaciones' },
    { label: 'Services', href: '#servicios' },
    { label: 'Gallery', href: '#galeria' },
    { label: 'Location', href: '#ubicacion' },
  ],
  cta: { label: 'Book', href: '#reservar' },
  menuOpen: 'Menu',
  menuClose: 'Close',
  skipLink: 'Skip to content',
}

const plurals = {
  night: { one: '{count} night', other: '{count} nights' },
  guest: { one: '{count} guest', other: '{count} guests' },
}

const hero = {
  id: 'inicio',
  title: 'A retreat between timber and sea',
  subtitle: 'Quiet rooms, a pool among palm trees and seasonal cooking.',
  cta: { label: 'Check availability', href: '#reservar' },
}

const search = {
  id: 'reservar',
  title: 'Check your stay',
  intro: 'Choose your dates and number of guests. The total price of each room is calculated instantly.',
  checkInLabel: 'Check-in',
  checkOutLabel: 'Check-out',
  guestsLabel: 'Guests',
  decreaseGuests: 'Remove a guest',
  increaseGuests: 'Add a guest',
  resultsTitle: 'Price for your dates',
  summary: '{nights} · {guests}',
  perNight: '{price} / night',
  nightsTimesPrice: '{nights} × {price}',
  totalLabel: 'Total',
  taxNote: 'Sample prices in US dollars (USD), taxes included.',
  bookLabel: 'Book',
  bookRoomLabel: 'Book {room}',
  unavailableLabel: 'Unavailable',
  overCapacity: 'This room sleeps up to {guests}.',
  errors: {
    missingDates: 'Choose a check-in and a check-out date.',
    pastCheckIn: 'Check-in cannot be earlier than today.',
    checkOutBeforeCheckIn: 'Check-out must be at least one day after check-in.',
    guestsRange: 'Enter between {min} and {max} guests.',
  },
  fixToSee: 'Fix the details to see the total price.',
}

const roomsSection = {
  id: 'habitaciones',
  title: 'Rooms',
  intro: 'Three ways to stay. All with linen bedding, a spacious shower and quiet nights.',
  capacity: 'Up to {guests}',
  totalForStay: 'Total for {nights}: {price}',
  empty: {
    title: 'Our rooms will be published soon',
    text: 'In the meantime, write to us and we will help you find the stay you are looking for.',
    cta: 'Write to the hotel',
  },
}

// Room texts. Data that does not change with the language (prices, capacity, size and photo) is in site.js.
// The `id` must match the one in site.js.
const rooms = [
  {
    id: 'jardin',
    name: 'Garden Room',
    description:
      'Ground floor with access to a small private garden. Light wood, a double bed and morning light.',
    bed: 'Double bed',
  },
  {
    id: 'terraza',
    name: 'Terrace Suite',
    description:
      'Floor-to-ceiling windows that open onto a terrace with sun loungers. Sitting area and a freestanding bathtub.',
    bed: 'King bed and sofa bed',
  },
  {
    id: 'casa',
    name: 'Family House',
    description:
      'Two bedrooms, a living room with a small kitchen and a shaded porch. Designed for families or groups of friends.',
    bed: 'Two bedrooms and a bunk bed',
  },
]

const services = {
  id: 'servicios',
  title: 'Services',
  intro:
    'Everything you need so you can stop thinking about anything else. Some services are booked at reception; the hours are samples.',
  items: [
    { name: 'Seasonal breakfast', description: 'Fresh bread, local fruit and coffee, served on the terrace from 7:30 to 11:00.' },
    { name: 'Outdoor pool', description: 'Warm water, sun loungers and pool towels from 9:00 to 20:00.' },
    { name: 'Restaurant', description: 'Locally sourced cooking for lunch and dinner. Booking a table is recommended.' },
    { name: 'Spa and massages', description: 'Treatment room with massages by prior reservation.' },
    { name: 'Transfers', description: 'Pick-up at the station or airport on request.' },
    { name: '24-hour reception', description: 'There is always someone to help you, even at night.' },
  ],
}

// Gallery. The order defines the position in the mosaic.
const gallery = {
  id: 'galeria',
  title: 'Gallery',
  items: [
    { image: 'galleryPool', caption: 'The pool' },
    { image: 'galleryDish', caption: 'Dinner at the restaurant' },
    { image: 'galleryLinen', caption: 'Linen bedding' },
    { image: 'galleryView', caption: 'Views from the suite' },
    { image: 'galleryBeach', caption: 'The beach at dawn' },
    { image: 'galleryBath', caption: 'Bathroom with a view' },
    { image: 'galleryTerrace', caption: 'Terrace by the water' },
  ],
}

const location = {
  id: 'ubicacion',
  title: 'How to get here',
  text: 'A ten-minute walk from the beach and twenty minutes by car from the station. Sample address.',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
  mapsLabel: 'Open in maps',
}

const finalCta = {
  title: 'Your room is waiting for you',
  text: 'Choose your dates, see the price and book in a minute.',
  cta: { label: 'Book now', href: '#reservar' },
}

// Texts of the floating WhatsApp button. The number is in src/data/site.js.
const whatsapp = {
  label: 'Chat on WhatsApp',
  // Message written when the chat opens. Variable: {hotel}.
  message: 'Hello, I would like information about bookings at {hotel}.',
}

// Texts of the booking request page (route #/reserva). Used when booking.mode is 'form'.
// The request is sent by email: the guest's email app opens with the message already written.
const request = {
  backLabel: 'Back to home',
  backHref: '#inicio',
  title: 'Request your booking',
  intro:
    'Choose your stay and leave us your details. We will confirm availability by email; nothing is charged now.',
  stayTitle: 'Your stay',
  guestTitle: 'Your details',
  roomLabel: 'Room',
  roomOption: '{room} · {price} / night',
  nameLabel: 'Full name',
  emailLabel: 'Email address',
  phoneLabel: 'Phone (optional)',
  notesLabel: 'Comments (optional)',
  notesHint: 'Arrival time, beds, allergies, celebrations…',
  consent: {
    before: 'I authorize the processing of my personal data in accordance with the ',
    link: 'personal data processing policy',
    after: ' in order to handle this request.',
  },
  submit: 'Send request',
  submitEmail: 'Send by email',
  submitWhatsApp: 'Send by WhatsApp',
  summaryTitle: 'Summary',
  errorsTitle: 'Please check these fields',
  errors: {
    roomRequired: 'Choose a room.',
    overCapacity: 'This room sleeps up to {guests}.',
    nameRequired: 'Enter your name.',
    emailInvalid: 'Enter a valid email address, for example name@email.com.',
    consentRequired: 'Authorize the processing of your personal data to send the request.',
  },
  // Message written in the email. Variables: room, rate, checkIn, checkOut, nights, guests, total, name, email, phone, notes.
  email: {
    subject: 'Booking request: {room}, {checkIn} - {checkOut}',
    body: [
      'Hello, I would like to request the following booking:',
      '',
      'Room: {room}',
      'Rate: {rate}',
      'Check-in: {checkIn}',
      'Check-out: {checkOut}',
      'Stay: {nights}',
      'Guests: {guests}',
      'Estimated total: {total}',
      '',
      'Name: {name}',
      'Email: {email}',
      'Phone: {phone}',
      '',
      'Comments: {notes}',
      '',
      "I authorize the processing of my personal data in accordance with the hotel's personal data processing policy.",
    ],
  },
  success: {
    title: 'Your request is ready to send',
    text: 'We have opened your email app with the request already written. Press “Send” there so it reaches {email}. The hotel will confirm availability by email.',
    notOpened: 'Did your email not open? Open it again, or copy the message and send it to {email}.',
    openMail: 'Open email',
    whatsappText:
      'We have opened WhatsApp with the request already written. Press “Send” there so it reaches the hotel. The hotel will confirm availability in that same chat.',
    whatsappNotOpened: "Did WhatsApp not open? Open it again, or copy the message and send it to the hotel's number.",
    openWhatsApp: 'Open WhatsApp',
    messageLabel: 'Message',
    copy: 'Copy message',
    copied: 'Message copied',
    edit: 'Edit request',
    backHome: 'Back to home',
  },
}

const footer = {
  sampleNotice: 'Sample text, prices and contact details.',
  contactTitle: 'Contact',
  legalTitle: 'Legal',
  privacyLabel: 'Privacy policy',
  dataTreatmentLabel: 'Personal data processing',
  cookiesLabel: 'Cookie policy',
  cookieSettingsLabel: 'Cookie settings',
  rights: 'All rights reserved.',
  photosLabel: 'Photos: Unsplash',
  photosUrl: 'https://unsplash.com',
}

const legal = {
  closeLabel: 'Close',
  privacy: {
    title: 'Privacy policy',
    body: [
      "Sample text. Replace it with the hotel's real privacy policy, written or reviewed by a professional.",
      'Data controller: Hotel Ejemplo, Calle del Ejemplo 12, 000000 Ciudad Ejemplo.',
      'Data we process: the data you send us when you write to us or book (name, email, phone and dates of stay), in order to manage your booking and answer your enquiries.',
      'You can exercise your rights of access, rectification, deletion, objection and portability by writing to reservas@example.com.',
    ],
  },
  // Sample text based on Colombian Law 1581 of 2012 and Decree 1377 of 2013. Each item of `body` is a paragraph (text),
  // a subheading ({ heading }) or a list ({ list }).
  dataTreatment: {
    title: 'Personal data processing policy',
    body: [
      "Sample text based on Colombian Law 1581 of 2012 and its implementing decrees. Replace it with the hotel's real policy, written or reviewed by a professional.",
      { heading: '1. Data controller' },
      'Hotel Ejemplo, Tax ID (NIT) 000.000.000-0, Calle del Ejemplo 12, 000000 Ciudad Ejemplo. Email: reservas@example.com. Phone: +57 000 000 0000.',
      { heading: '2. Data we collect' },
      'Name, email address, phone (optional), dates of stay, number of guests, the room chosen and the comments you write in the request. We do not ask for sensitive data; please avoid including it in the comments.',
      { heading: '3. Purposes of the processing' },
      {
        list: [
          'To manage your booking request and confirm availability.',
          'To contact you about your stay: changes, cancellations and arrival instructions.',
          'To handle your enquiries, requests and complaints.',
          'To comply with legal, accounting and guest-registration obligations.',
        ],
      },
      'We will not use your data for different purposes without asking for your new authorization.',
      { heading: '4. Authorization' },
      'By ticking the box on the booking form you give your prior, express and informed authorization for the processing of your data for these purposes. We keep proof of the authorization. You may revoke it at any time, unless there is a legal or contractual duty to keep the data.',
      { heading: '5. Your rights as a data subject' },
      {
        list: [
          'To know, update and rectify your personal data.',
          'To request proof of the authorization you gave us.',
          'To be informed about how your data has been used.',
          'To file complaints with the Superintendence of Industry and Commerce (SIC) for infringements of the law, once you have gone through the procedure with the hotel.',
          'To revoke the authorization and request the deletion of your data when the legal principles, rights and guarantees are not respected.',
          'To access free of charge the data that has been processed.',
        ],
      },
      { heading: '6. Contact area and procedure' },
      'Requests, queries and complaints are handled by the Reservations department. Write to reservas@example.com with your name, a contact method, a description of your query or complaint and any documents you want to rely on.',
      'Queries: we answer them within 10 business days of receipt. If that is not possible, we will tell you why and give you the new date, which will not exceed 5 additional business days.',
      'Complaints to correct, update or delete data: we resolve them within 15 business days from the day after receipt. If that is not possible, we will tell you why and give you the new date, which will not exceed 8 additional business days. If the complaint is incomplete, we will ask you to complete it within the following 5 business days.',
      { heading: '7. Security and providers' },
      'We apply reasonable measures to protect your data. We may share it with providers that offer us services (web hosting, email), who process it only on our behalf and for these purposes. Sample text: list the real providers here and whether there are international transfers.',
      { heading: '8. Validity' },
      'This policy takes effect on 00 Month 0000. We keep the data for as long as necessary for the purposes described and for legal obligations. If the policy changes substantially, we will tell you before applying the changes.',
    ],
  },
  cookies: {
    title: 'Cookie policy',
    body: [
      "Sample text. Replace it with the site's real cookie policy.",
      'Necessary cookies: they store your cookie preferences and cannot be disabled.',
      'Analytics cookies: they help us understand which pages are visited. They are only activated if you accept them.',
      'Marketing cookies: they allow relevant ads to be shown on other sites. They are only activated if you accept them.',
      'You can change your choice at any time from “Cookie settings” in the footer.',
    ],
  },
}

const cookies = {
  bannerText: 'We use necessary cookies so the site works and, if you allow us, analytics and marketing cookies.',
  policyLink: 'More information',
  acceptAll: 'Accept',
  rejectAll: 'Reject',
  configure: 'Settings',
  settingsTitle: 'Cookie settings',
  settingsIntro: 'Choose which cookies you accept. You can change it whenever you like.',
  save: 'Save preferences',
  alwaysOn: 'Always active',
  categories: [
    { id: 'necessary', label: 'Necessary', description: 'Store your cookie choice.', required: true },
    { id: 'analytics', label: 'Analytics', description: 'Measure visits in aggregate.' },
    { id: 'marketing', label: 'Marketing', description: 'Personalize ads on other sites.' },
  ],
}

export default {
  meta,
  language,
  seo,
  hotel,
  nav,
  plurals,
  hero,
  search,
  roomsSection,
  rooms,
  services,
  gallery,
  location,
  whatsapp,
  request,
  finalCta,
  footer,
  legal,
  cookies,
}
