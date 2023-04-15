import type { Config } from 'tailwindcss'

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config
