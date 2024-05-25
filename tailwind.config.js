/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: () => ({
        'light-background': "url('light-bg.jpg')",
        'dark-background': "url('dark-bg.jpg')",
       })
    },
  },
  plugins: [],
}

