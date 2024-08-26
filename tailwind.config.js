/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Esto asegura que Tailwind analice todos los archivos JS y JSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
