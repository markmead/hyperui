const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./pages/**/*.jsx', './src/components/**/*.jsx', './src/data/components/*.mdx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

module.exports = tailwindConfig
