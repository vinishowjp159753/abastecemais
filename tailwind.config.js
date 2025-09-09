
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6EC43F",
        primaryDark: "#2B7A2E",
        accent: "#F5A623",
        background: "#F8FAFC",
        card: "#FFFFFF",
        graphite: "#222222"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        display: ["Poppins","Inter","system-ui"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.08)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    },
  },
  plugins: [],
}
