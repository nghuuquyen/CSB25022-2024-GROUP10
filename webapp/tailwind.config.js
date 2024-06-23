/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,ejs}', './public/**/*.{js,ts}'],
    theme: {
        extend: {
            colors: {
                seashell: '#fff5ec',
                metalic_bronze: '#A96942',
                melon: '#FBC4B5',
            },
            fontFamily: {
                serif: ['Libre Baskerville', 'serif'],
                cursive: ['Pacifico', 'cursive'],
                mono: ['Monaco, mono'],
                monospace: ['Courier New', 'Courier', 'monospace'],
            },
        },
    },
    plugins: [],
};
