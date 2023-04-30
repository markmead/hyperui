/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.jsx', './components/**/*.jsx'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
