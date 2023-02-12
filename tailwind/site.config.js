/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
