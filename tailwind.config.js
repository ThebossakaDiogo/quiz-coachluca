/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#E63988',
          'primary-light': '#FF65AA',
          'primary-dark': '#B81E64',
          magenta: '#D8387D',
          'magenta-deep': '#4A0E31',
          secondary: '#4A154B',
          'secondary-dark': '#2B0A2C',
          accent: '#10B981',
          'accent-dark': '#059669',
          coral: '#FF7051',
          'coral-dark': '#E65333',
          gold: '#E5A638',
          bg: '#F9EDF6',
          'bg-soft': '#FDF4FA',
          'bg-dark': '#1C0D17',
          surface: '#FFFFFF',
          text: '#1F121C',
          'text-secondary': '#635360',
          'text-muted': '#968493',
          border: '#F0DCEB',
          'border-dark': '#48273F'
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'pop-in': 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '80%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
