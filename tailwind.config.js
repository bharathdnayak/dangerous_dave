/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        daveBlue: '#0000AA',
        daveRed: '#AA0000',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      }
    },
  },
  plugins: [],
}
