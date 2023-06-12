/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    // The content section of your tailwind.config.js file is where you configure the paths to all of your HTML templates, JavaScript components, and any other source files that contain Tailwind class names
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}', // must use this line to compile and generate our RizzUI components style
    ],
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000',
            current: 'currentColor',
            transparent: 'transparent',
            /*
             * you can use hex code color value unless you want light and dark mode color scheme,
             * we are using css variables for light and dark mode color scheme
             */
            gray: {
                0: 'rgb(var(--gray-0) / <alpha-value>)',
                50: 'rgb(var(--gray-50) / <alpha-value>)',
                100: 'rgb(var(--gray-100) / <alpha-value>)',
                200: 'rgb(var(--gray-200) / <alpha-value>)',
                300: 'rgb(var(--gray-300) / <alpha-value>)',
                400: 'rgb(var(--gray-400) / <alpha-value>)',
                500: 'rgb(var(--gray-500) / <alpha-value>)',
                600: 'rgb(var(--gray-600) / <alpha-value>)',
                700: 'rgb(var(--gray-700) / <alpha-value>)',
                800: 'rgb(var(--gray-800) / <alpha-value>)',
                900: 'rgb(var(--gray-900) / <alpha-value>)',
                1000: 'rgb(var(--gray-1000) / <alpha-value>)',
            },
            primary: {
                lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
                light: 'rgb(var(--primary-light) / <alpha-value>)',
                DEFAULT: 'rgb(var(--primary-default) / <alpha-value>)',
                dark: 'rgb(var(--primary-dark) / <alpha-value>)',
            },
            secondary: {
                lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
                light: 'rgb(var(--secondary-light) / <alpha-value>)',
                DEFAULT: 'rgb(var(--secondary-default) / <alpha-value>)',
                dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
            },
            red: {
                lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
                light: 'rgb(var(--red-light) / <alpha-value>)',
                DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
                dark: 'rgb(var(--red-dark) / <alpha-value>)',
            },
            orange: {
                lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
                light: 'rgb(var(--orange-light) / <alpha-value>)',
                DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
                dark: 'rgb(var(--orange-dark) / <alpha-value>)',
            },
            blue: {
                lighter: 'rgb(var(--blue-lighter) / <alpha-value>)',
                light: 'rgb(var(--blue-light) / <alpha-value>)',
                DEFAULT: 'rgb(var(--blue-default) / <alpha-value>)',
                dark: 'rgb(var(--blue-dark) / <alpha-value>)',
            },
            green: {
                lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
                light: 'rgb(var(--green-light) / <alpha-value>)',
                DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
                dark: 'rgb(var(--green-dark) / <alpha-value>)',
            },
        },
        extend: {
            // requried these animations for the Loader component
            animation: {
                blink: 'blink 1.4s infinite both;',
                'scale-up': 'scaleUp 500ms infinite alternate',
            },
            keyframes: {
                blink: {
                    '0%': { opacity: 0.2 },
                    '20%': { opacity: 1 },
                    '100%': { opacity: 0.2 },
                },
                scaleUp: {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({ addVariant }) {
            // required this to prevent any style on readOnly input elements
            addVariant('not-read-only', '&:not(:read-only)');
        }),
    ],
};