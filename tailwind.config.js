/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#F7F6F3',
                primary: 'hsl(245, 58%, 51%)', // Indigo/Purple
                text: '#111111', // Main text color
                accent: '#8B0000',
                success: '#4CAF50',
                warning: '#FFC107',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            spacing: {
                '8': '8px',
                '16': '16px',
                '24': '24px',
                '40': '40px',
                '64': '64px',
            },
        },
    },
    plugins: [],
}
