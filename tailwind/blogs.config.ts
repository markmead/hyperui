import type { Config } from 'tailwindcss'

const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: ['./public/blogs/*.html', './src/data/posts/*.mdx'],
  theme: {
    textShadow: {
      sm: '0 1px 2px var(--tw-shadow-color)',
      DEFAULT: '0 2px 4px var(--tw-shadow-color)',
      lg: '0 8px 16px var(--tw-shadow-color)',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({
      matchUtilities,
      theme,
    }: {
      matchUtilities: CallableFunction
      theme: CallableFunction
    }) {
      matchUtilities(
        {
          'text-shadow': (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
  presets: [require('./extras.preset.js')],
} satisfies Config
