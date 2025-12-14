/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#22D3EE',
                surface: 'rgba(255, 255, 255, 0.05)',
                'pos-bg-start': '#023047',
                'pos-bg-end': '#001219',
            },
            fontFamily: {
                sans: ['Almarai', 'sans-serif'],
                numbers: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
