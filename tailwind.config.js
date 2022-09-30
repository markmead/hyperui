/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './components/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/components/*.{md,mdx}',
    './lib/*.{js,ts}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/**/*.html',
    './utils/*.{js,ts}',
    './styles/*.css',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
