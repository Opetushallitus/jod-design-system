/** @type {import('tailwindcss').Config} */
export default {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'jod-base': '#444bac',
        'jod-primary': '#f2a93b',
        'jod-secondary': '#AFB3F3',
        'jod-dark': '#181818',
        'jod-light': '#f5f5f5',
        'jod-white': '#ffffff',
        'jod-black': '#000000',
        'jod-disabled': '#cccccc',
      },
    },
  },
  plugins: [],
};
