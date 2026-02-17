/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#F7F6F3',
                primary: '#111111',
                accent: '#8B0000',
                success: '#4CAF50', // Muted green
                warning: '#FFC107', // Muted amber
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
