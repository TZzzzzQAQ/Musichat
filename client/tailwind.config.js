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
            },
            backgroundImage: {
                'dust-red': 'linear-gradient(180deg, #ffccc7, #cf1322)',
                'volcano': 'linear-gradient(180deg, #ffd8bf, #d4380d)',
                'sunset-orange': 'linear-gradient(180deg, #ffe7ba, #d46b08)',
                'calendula-gold': 'linear-gradient(180deg, #fff1b8, #d48806)',
                'sunrise-yellow': 'linear-gradient(180deg, #ffffb8, #d4b106)',
                'polar_green': 'linear-gradient(180deg, #d9f7be, #389e0d)',
                'cyan': 'linear-gradient(180deg, #b5f5ec, #08979c)',
                'daybreak-blue': 'linear-gradient(180deg, #bae0ff, #0958d9)',
                'geek-blue': 'linear-gradient(180deg, #d6e4ff, #1d39c4)',
                'golden-purple': 'linear-gradient(180deg, #efdbff, #531dab)',
                'magenta': 'linear-gradient(180deg, #ffd6e7, #c41d7f)',
                'darkbg': 'linear-gradient(180deg, #0f0f0f, #251f5e)'
            },
            keyframes: {
                gradientBackground: {
                    '0%': { 'background-position': '50% 0' },
                    '50%': { 'background-position': '50% 100%' },
                    '100%': { 'background-position': '50% 0' },
                },
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' }
                }
            },
            animation: {
                'gradient-bg': 'gradientBackground 8s ease infinite',
                'marquee': 'marquee 10s linear infinite'
            },
            backgroundSize: {
                'large-300': '300% 300%',
            }
        },
    },
    plugins: [],
}

