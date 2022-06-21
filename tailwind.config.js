module.exports = {
  content: [
    './components/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/components/*.{md,mdx}',
    './lib/*.{js,ts}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/components/**/*.html',
    './public/components/**/**/*.html',
    './utils/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
