module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/*.{js,ts}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
