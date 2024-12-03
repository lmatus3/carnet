/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        azeretMono: ['"AzeretMono"', "monospace"], // Agregamos AzeretMono
      },
      colors: {
        GrayMedium: "#404040",
        BlueStrong: "#0c1b33 ",
        BlueMedium: "#04337f ",
        BlueLight: "#013a96 ",
        OrangeMedium: "#fc9d15 ",
        OrangeStrong: "#ff6000",
        YellowStrong: "#fad126",
        YellowMedium: "#edc121",
        YellowLight: "#ffe895",
      },
      fontSize: {
        h1: "34px",
        h2: "30px",
        h3: "24px",
        h3: "20px",
      },
    },
  },
  plugins: [],
};
