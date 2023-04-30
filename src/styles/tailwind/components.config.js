/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./public/components/**/*.html', './data/components/*.mdx'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  presets: [require('./extend.preset.js')],
}
