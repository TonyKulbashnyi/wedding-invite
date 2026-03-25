/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./nuxt/**/*.{vue,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f2e6",
        charcoal: "#4a4a48",
        taupe: "#9c8f7a",
        stone: "#d5cbb8",
        birch: "#cac7c1",
        lichen: "#a8ae85",
        graphite: "#3e3e3e",
        moss: "#4b5335",
        forest: "#2d321d",
        capuccino: "#f4f2ed",
        green: "rgb(94,108,36)",
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Lora", "Georgia", "serif"],
        script: ['"Sloop Script Pro"', "cursive"],
      },
    },
  },
  plugins: [],
};
