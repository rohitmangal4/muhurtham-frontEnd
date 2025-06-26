/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepPlum: '#582534',
        warmPeach: '#ffc5a1',
        linen: '#fff7f0',
        mutedBlack: '#1f1f1f'
      },
    },
  },
  plugins: [],
};
