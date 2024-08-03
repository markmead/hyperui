const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./app/**/*.jsx', './src/components/**/*.jsx', './src/data/components/*.mdx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

export default tailwindConfig
