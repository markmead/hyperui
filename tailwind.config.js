module.exports = {
  content: [
    './components/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/components/*.{md,mdx}',
    './lib/*.{js,ts}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/**/*.html',
    './utils/*.{js,ts}',
  ],
  theme: {
    extend: {
      animation: {
        dropdown: 'dropdown 0.3s ease forwards',
      },
      keyframes: {
        dropdown: {
          '0%': { transform: 'translateY(-1rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
