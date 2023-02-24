/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/blogs/**/*.html', './src/data/posts/*.mdx'],
  plugins: [require('@tailwindcss/forms')],
  presets: [require('./extras.preset')],
}
