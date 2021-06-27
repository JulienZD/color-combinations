module.exports = {
  mode: 'jit',
  plugins: [require('@tailwindcss/forms')],
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '0.5rem'
      },
    },
    extend: {
      colors: {
        primary: 'white',
        secondary: '#2563EB'
      },
    },
  },
  variants: {
    extend: {},
  },
}
