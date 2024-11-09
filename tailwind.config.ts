import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: "#FFF8A7",
        secondary: "#BF3D3D",
        accent: "#FFFDF0",
      },
      fontFamily: {
        dynapuff: ['"DynaPuff"', "sans-serif"],
        caveat: ['"Caveat Brush"', "sans-serif"],
        karla: ['"Karla"', "sans-serif"],
        macondo: ['"Macondo"', "sans-serif "],
        concert: ['"Concert One"', "sans-serif"],
        secondary: ['"Montserrat"', "sans-serif"],
      },
    },
  },

  plugins: [typography],
} as Config;
