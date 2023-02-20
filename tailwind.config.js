/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,jsx,js}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#034A7A",
          400: "#005995",
          500: "#034A7A",
          600: "#003d65",
        },
        secondary: "#799FB9",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
