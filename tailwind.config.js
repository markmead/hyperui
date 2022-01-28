module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/**/*.html',
    './lib/*.{js,ts}',
  ],
  theme: {
    extend: {
      boxShadow: {
        cartoon: '4px 4px 0 0 black',
        example: '8px 8px 0 0 black',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
