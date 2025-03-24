/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        leagueGothic: ["LeagueGothic", "monospace"],
        inter: ["Inter", "monospace"],
        monserrat: ["Montserrat", "monospace"],
      },
      colors: {
        BlackPosgrado: "#1F1F1F",
        GrayMedium: "#404040",
        BlueStrong: "#0c1b33 ",
        BlueMedium: "#04337f ",
        BlueLight: "#013a96 ",
        OrangeMedium: "#fc9d15 ",
        OrangeStrong: "#ff6000",
        YellowStrong: "#fad126",
        YellowMedium: "#edc121",
        YellowLight: "#ffe895",
        blueDark: "#0c1b33",
        blueSemiDark: "#04337f",
        yellowLight: "#ffe895",
        yellow: "#edc121 ",
        yellowStrong: "#fad126",
        orangeStrong: "#ff6000",
        orange: "fc9d15",
      },
      fontSize: {
        h1: "34px",
        h2: "30px",
        h3: "24px",
        h3: "20px",
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
