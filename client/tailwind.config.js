/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            },
            backdropFilter: {
                'none': 'none',
                'blur': 'blur(20px)',
            },
            userSelect: {
                none: 'none',
            }
        },
    },
    plugins: [],
}

