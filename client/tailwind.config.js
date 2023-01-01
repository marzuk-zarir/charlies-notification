const konstaConfig = require('konsta/config')

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '2000px',
            '2xl': '5000px'
        },
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: '0.8rem',
                    sm: '1rem'
                }
            },
            colors: {
                magenta: {
                    50: '#ff63d0',
                    100: '#ff59c6',
                    200: '#ff4fbc',
                    300: '#ff45b2',
                    400: '#fe3ba8',
                    500: '#f4319e',
                    600: '#ea2794',
                    700: '#e01d8a',
                    800: '#d61380',
                    900: '#cc0976'
                }
            }
        }
    },
    plugins: []
})
