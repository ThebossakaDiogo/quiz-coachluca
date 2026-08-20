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
          primary: '#FF2A85',
          'primary-light': '#FF5EAA',
          'primary-dark': '#D60A66',
          hotpink: '#FF1493',
          neonpink: '#FF007F',
          magenta: '#FF1B7A',
          'magenta-deep': '#3D0026',
          secondary: '#2B0B2E',
          'secondary-dark': '#19041C',
          wine: '#2B0B2E',
          'wine-light': '#4C1450',
          yellow: '#FFE600',
          'yellow-light': '#FFF59D',
          'yellow-soft': '#FFFBE6',
          gold: '#FFB800',
          'gold-light': '#FFF176',
          coral: '#FF3377',
          'coral-dark': '#D81B60',
          'coral-soft': '#FFD0DF',
          accent: '#10B981',
          'accent-dark': '#059669',
          lime: '#A7FF00',
          bg: '#FFF9F2',
          'bg-soft': '#FFF4FA',
          'bg-dark': '#19041C',
          surface: '#FFFFFF',
          text: '#2B0B2E',
          'text-secondary': '#6C586B',
          'text-muted': '#968493',
          border: '#FDE2EE',
          'border-yellow': '#FFE600',
          'border-dark': '#4C1450'
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
