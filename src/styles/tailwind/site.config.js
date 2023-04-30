/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.jsx', './src/components/**/*.jsx'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
