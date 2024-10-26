/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ['"DynaPuff"', 'sans-serif'],
        caveat: ['"Caveat Brush"', 'sans-serif'],
        karla: ['"Karla"', 'sans-serif'],
        macondo: ['"Macondo"','sans-serif '],
        concert: ['"Concert One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
