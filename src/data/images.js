// Todas las fotos de la landing (Unsplash). Para cambiar una foto, sustituye su id y su texto alternativo.
// El id es la parte de la URL de images.unsplash.com que va después de "photo-".

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
    'Edificio de madera con tejado a dos aguas junto a una piscina con tumbonas',
    2000,
  ),

  roomGarden: unsplash(
    '1611892440504-42a792e24d32',
    'Habitación con cama de matrimonio, paredes de madera y luz cálida',
    1400,
  ),
  roomTerrace: unsplash(
    '1582719478250-c89cae4dc85b',
    'Dormitorio con suelo de madera y grandes ventanales abiertos al exterior',
    1400,
  ),
  roomFamily: unsplash(
    '1566665797739-1674de7a421a',
    'Dormitorio con persianas de madera oscura, lámparas de latón y suelo de madera',
    1400,
  ),

  galleryPool: unsplash('1520250497591-112f2f40a3f4', 'Piscina rodeada de palmeras con montañas al fondo', 1400),
  galleryDish: unsplash('1414235077428-338989a2e8c0', 'Plato servido en una mesa del restaurante con copas de vino', 960),
  galleryLinen: unsplash('1629140727571-9b5c6f6267b4', 'Cama con ropa de lino blanca junto a cortinas de tela', 960),
  galleryView: unsplash('1596394516093-501ba68a0ba6', 'Terraza de madera con cama de día y sillas frente a un lago entre montañas', 960),
  galleryBeach: unsplash('1507525428034-b723cf961d3e', 'Playa de arena con olas suaves al amanecer', 1400),
  galleryBath: unsplash('1602002418082-a4443e081dd1', 'Bañera frente a ventanales con vistas al mar', 960),
  galleryTerrace: unsplash('1559339352-11d035aa65de', 'Terraza del restaurante con mesas junto al agua', 960),

  location: unsplash(
    '1542314831-068cd1dbfeeb',
    'Entrada del hotel iluminada al anochecer junto a la piscina',
    1400,
  ),
}

// Créditos del pie de página. Añade { name, url } por cada fotógrafo cuando lo hayas confirmado en Unsplash.
export const photoCredits = []
