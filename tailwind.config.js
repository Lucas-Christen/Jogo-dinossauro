/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que ele leia todos os seus componentes
  ],
  theme: {
    extend: {
      colors: { // Garante que nossas cores personalizadas estão aqui
        'card-bg': '#1a262c',
        'card-border': '#6b7f88',
        'card-header': '#2f3e46',
        'attr-bg': '#1f2e35',
        'attr-icon-green': '#97ac3d',
      },
    },
  },
  plugins: [],
}