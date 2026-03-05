/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // MUST be exactly this
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem', 
      }
    },
  },
  plugins: [],
}