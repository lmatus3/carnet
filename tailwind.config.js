/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        azeretMono: ['"AzeretMono"', "monospace"], // Agregamos AzeretMono
      },
      colors: {
        DarkBlue: "#1E0342",
        PaleBlue: "#0E46A3",
        GreenPale: "#9AC8CD",
        GreenLight: "#E1F7F5",
      },
      fontSize: {
        h1: "34px",
        h2: "30px",
        h3: "24px",
        h3: "20px"
      },
    },
  },
  plugins: [],
};
