/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#130b22',    // Base bg
          DEFAULT: '#201834', // Original #201834 gradient stop
          light: '#2a1f42',   // Lighter card backgrounds
        },
        sidebar: {
          bg: '#0f0e12',
          border: 'rgba(255,255,255,0.06)'
        },
        accent: {
          blue: '#AFD2FA',
          gold: '#B9915E'
        }
      }
    },
  },
  plugins: [],
}
