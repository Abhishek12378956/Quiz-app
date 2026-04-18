/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#f1c40f',
          dark: '#d4a017',
        },
        surface: {
          DEFAULT: '#1e293b',
          deep: '#0f172a',
          card: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}
