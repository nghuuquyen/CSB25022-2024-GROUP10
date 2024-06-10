/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          seashell: '#fff5ec',
          metalic_bronze: '#A96942',
          melon: '#FBC4B5',

        },
        fontFamily:{
          serif: ['Libre Baskerville', 'serif'],
          cursive: ['Pacifico', 'cursive'],
        }
      },
    },
    variants: {},
    plugins: [],
  }
  
  