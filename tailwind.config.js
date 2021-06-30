// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  plugins: [require('@tailwindcss/forms')],
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '0.5rem',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'white',
          100: colors.coolGray['100'],
          200: colors.coolGray['200'],
          300: colors.coolGray['300'],
          400: colors.coolGray['400'],
          500: colors.coolGray['500'],
          600: colors.coolGray['600'],
          700: colors.coolGray['700'],
          800: colors.coolGray['800'],
          900: colors.coolGray['900'],
        },
        secondary: colors.blue,
        dark: {
          primary: colors.gray,
          secondary: colors.teal,
          special: '#EDAE49',
        },
      },
      boxShadow: {
        sharp: '-2px 6px 7px -2px rgba(0,0,0,0.59)',
      },
    },
  },
  variants: {
    extend: {},
  },
};
