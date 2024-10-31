/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'veryLight-purple':'#f4f1ff',
        'light-purple': '#b9bfff',
        'purple': '#8b74bd',
        'dark-blue': '#22277a',
        'neutral-bg': '#DDDDDD',
        'neutral-text': '#B3B3B3',
        'success': '#027E46',
        'success-light': '#E6F2EC',
        'info': '#005EFF',
        'info-light': '#F5F9FF',
        'warning': '#3b372f',
        'warning-light': '#FEF7E7',
        'error': '#E11900',
        'error-light': '#FCE8E6',
      },
    },
  },
  plugins: [],
}

