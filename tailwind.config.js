// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')

const palette = {
  primary: {
    50: '#f4fce8',
    100: '#e8f5d0',
    200: '#c8e7c0',
    300: '#a8f7b5',
    400: '#8bc97a',
    500: '#6b8e23',
    600: '#5a761e',
    700: '#4a5f19',
    800: '#3a4a14',
    900: '#2a350f',
    950: '#1a220a',
  },
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce8',
    200: '#c8f7d4',
    300: '#a8f7b5',
    400: '#86ef9e',
    500: '#5ed67a',
    600: '#3eb85c',
    700: '#2d8a44',
    800: '#1f5c2e',
    900: '#143d1f',
    950: '#0a1f10',
  },
  gray: {
    50: '#fef8f2',
    100: '#fad2a6',
    200: '#e0b384',
    300: '#c49a6a',
    400: '#a0522d',
    500: '#8b4513',
    600: '#6b5e50',
    700: '#5c5042',
    800: '#4a4035',
    900: '#3a3229',
    950: '#1f1a16',
  },
}

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: ['./node_modules/pliny/**/*.js', './src/**/*.{js,ts,jsx,tsx}', './data/**/*.mdx'],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: palette,
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.primary.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
