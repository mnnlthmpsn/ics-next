module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        sm: '2rem',
        md: '5rem',
        lg: '10rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
