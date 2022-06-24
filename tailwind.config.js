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
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
