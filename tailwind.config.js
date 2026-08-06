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
          primary: '#FF3D7F',
          'primary-dark': '#D92667',
          secondary: '#5B163A',
          'secondary-dark': '#320C22',
          accent: '#32B768',
          'accent-dark': '#21894A',
          gold: '#D9A441',
          bg: '#FFF9F6',
          'bg-soft': '#FFF0F5',
          'bg-dark': '#161014',
          surface: '#FFFFFF',
          text: '#171116',
          'text-secondary': '#5F525A',
          'text-muted': '#8C7D86',
          border: '#F0E3E9',
          'border-dark': '#432C37'
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
