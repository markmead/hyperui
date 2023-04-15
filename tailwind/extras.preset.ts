import type { Config } from 'tailwindcss'

module.exports = {
  content: [],
  theme: {
    extend: {
      animation: {
        background: 'background ease infinite',
      },
      keyframes: {
        background: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
} satisfies Config
