const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.jsx',
    './pages/**/*.jsx',
    './src/components/**/*.jsx',
    './src/data/components/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  presets: [require('./extend.preset.js')],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
