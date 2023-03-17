/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
