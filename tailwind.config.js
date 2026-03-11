/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#52c41a',
          dark: '#2d6d0d',
        },
      },
    },
  },
  plugins: [],
};

