/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Montserrat Variable", "sans-serif"],
        accent: ["Space Grotesk Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
