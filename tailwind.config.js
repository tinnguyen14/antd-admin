/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
        primaryGradientStart: '#0047ab',
        primaryGradientEnd: '#1ca9c9',
      },
    },
  },
  plugins: [],
}
