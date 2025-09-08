// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card-bg': '#1a262c',
        'card-border': '#6b7f88',
        'card-header': '#2f3e46',
        'attr-bg': '#1f2e35',
        'attr-icon-green': '#97ac3d',
      },
      // Adicionado para as animações
      keyframes: {
        'pulse-once': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        'pulse-once': 'pulse-once 0.7s ease-in-out',
      }
    },
  },
  plugins: [],
}