/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "high-dark-col": "var(--highlight-dark-color)",
        "high-light-col": "var(--highlight-light-color)",
        "light1-col": "var(--light1-color)",
        "light2-col": "var(--light2-color)",
      }
    },
  },
  plugins: [],
}
