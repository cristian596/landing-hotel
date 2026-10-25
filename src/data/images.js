// Todas las fotos de la landing (Unsplash). Para cambiar una foto, sustituye su id y sus textos alternativos.
// El id es la parte de la URL de images.unsplash.com que va después de "photo-".
// `alt` lleva el texto alternativo en cada idioma ({ es, en }). Una foto propia puede ser { alt: { es, en }, src: '/foto.jpg' }.

const BASE = 'https://images.unsplash.com'
const PARAMS = 'auto=format&fit=crop&q=80'
const WIDTHS = [640, 960, 1400, 2000]

function unsplash(id, alt, width) {
  const url = (w) => `${BASE}/photo-${id}?${PARAMS}&w=${w}`
  return {
    alt,
    src: url(width),
    srcSet: WIDTHS.filter((w) => w <= width)
      .map((w) => `${url(w)} ${w}w`)
      .join(', '),
  }
}

export const images = {
  hero: unsplash(
    '1566073771259-6a8506099945',
    {
      es: 'Edificio de madera con tejado a dos aguas junto a una piscina con tumbonas',
      en: 'Wooden building with a gabled roof next to a pool with sun loungers',
    },
    2000,
  ),

  roomGarden: unsplash(
    '1611892440504-42a792e24d32',
    {
      es: 'Habitación con cama de matrimonio, paredes de madera y luz cálida',
      en: 'Room with a double bed, wooden walls and warm light',
    },
    1400,
  ),
  roomTerrace: unsplash(
    '1582719478250-c89cae4dc85b',
    {
      es: 'Dormitorio con suelo de madera y grandes ventanales abiertos al exterior',
      en: 'Bedroom with a wooden floor and large windows opening to the outdoors',
    },
    1400,
  ),
  roomFamily: unsplash(
    '1566665797739-1674de7a421a',
    {
      es: 'Dormitorio con persianas de madera oscura, lámparas de latón y suelo de madera',
      en: 'Bedroom with dark wooden blinds, brass lamps and a wooden floor',
    },
    1400,
  ),

  galleryPool: unsplash(
    '1520250497591-112f2f40a3f4',
    { es: 'Piscina rodeada de palmeras con montañas al fondo', en: 'Pool surrounded by palm trees with mountains in the background' },
    1400,
  ),
  galleryDish: unsplash(
    '1414235077428-338989a2e8c0',
    { es: 'Plato servido en una mesa del restaurante con copas de vino', en: 'Dish served at a restaurant table with wine glasses' },
    960,
  ),
  galleryLinen: unsplash(
    '1629140727571-9b5c6f6267b4',
    { es: 'Cama con ropa de lino blanca junto a cortinas de tela', en: 'Bed with white linen next to fabric curtains' },
    960,
  ),
  galleryView: unsplash(
    '1596394516093-501ba68a0ba6',
    {
      es: 'Terraza de madera con cama de día y sillas frente a un lago entre montañas',
      en: 'Wooden terrace with a daybed and chairs facing a lake among mountains',
    },
    960,
  ),
  galleryBeach: unsplash(
    '1507525428034-b723cf961d3e',
    { es: 'Playa de arena con olas suaves al amanecer', en: 'Sandy beach with gentle waves at dawn' },
    1400,
  ),
  galleryBath: unsplash(
    '1602002418082-a4443e081dd1',
    { es: 'Bañera frente a ventanales con vistas al mar', en: 'Bathtub in front of large windows with sea views' },
    960,
  ),
  galleryTerrace: unsplash(
    '1559339352-11d035aa65de',
    { es: 'Terraza del restaurante con mesas junto al agua', en: 'Restaurant terrace with tables by the water' },
    960,
  ),

  location: unsplash(
    '1542314831-068cd1dbfeeb',
    {
      es: 'Entrada del hotel iluminada al anochecer junto a la piscina',
      en: 'Hotel entrance lit up at dusk next to the pool',
    },
    1400,
  ),
}

// Créditos del pie de página. Añade { name, url } por cada fotógrafo cuando lo hayas confirmado en Unsplash.
export const photoCredits = []
