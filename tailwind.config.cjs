/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./nuxt/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f2e6',
        charcoal: '#4a4a48',
        taupe: '#9c8f7a',
        stone: '#d5cbb8',
        birch: '#cac7c1',
        lichen: '#a8ae85',
        moss: '#4b5335',
        forest: '#2d321d',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

