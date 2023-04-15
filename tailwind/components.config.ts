import type { Config } from 'tailwindcss'

module.exports = {
  darkMode: 'class',
  content: ['./public/components/**/*.html', './src/data/components/*.mdx'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  presets: [require('./extras.preset.js')],
} satisfies Config
