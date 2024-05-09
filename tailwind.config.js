/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PlayFair: '"Playfair Display", serif;',
        Lato: '"Lato", sans-serif;',
      },
    },
  },
  plugins: [require("daisyui")],
};
