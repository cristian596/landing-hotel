import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Paleta completa: sustituye la de Tailwind para que solo existan estos tokens.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      paper: '#F3EEE5', // fondo
      ink: '#1E2420', // tinta
      accent: {
        DEFAULT: '#9B4A2C', // acento (terracota)
        strong: '#7E3A21',
      },
      sand: {
        DEFAULT: '#E7DFD1', // superficie
        strong: '#D8CCB8', // superficie marcada / fallback de imágenes
      },
    },
    fontFamily: {
      display: ['Fraunces', 'Georgia', 'serif'],
      sans: ['Manrope', 'system-ui', 'sans-serif'],
    },
    // Solo cinco tamaños de texto en toda la página.
    fontSize: {
      base: ['1rem', { lineHeight: '1.6' }],
      lead: ['1.25rem', { lineHeight: '1.5' }],
      title: ['clamp(1.5rem, 1.2rem + 1vw, 2rem)', { lineHeight: '1.2' }],
      section: ['clamp(2.25rem, 1.6rem + 2.4vw, 3.5rem)', { lineHeight: '1.1' }],
      display: ['clamp(2.25rem, 1.2rem + 4.4vw, 5.5rem)', { lineHeight: '1.05' }],
    },
    extend: {
      spacing: {
        gutter: 'clamp(1.25rem, 5vw, 4rem)', // margen lateral único para todas las secciones
        section: 'clamp(6rem, 4rem + 6vw, 10rem)', // separación entre secciones (160px en escritorio)
      },
      maxWidth: {
        page: '90rem',
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      transitionDelay: {
        0: '0ms',
        75: '75ms',
        150: '150ms',
        225: '225ms',
        300: '300ms',
      },
      keyframes: {
        'hero-zoom': {
          from: { transform: 'scale(1.05)' },
          to: { transform: 'scale(1)' },
        },
      },
      animation: {
        'hero-zoom': 'hero-zoom 1800ms cubic-bezier(0.23, 1, 0.32, 1) both',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('can-hover', '@media (hover: hover) and (pointer: fine)')
    }),
  ],
}
