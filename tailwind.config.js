/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#5B4EE5',
        secondary: '#8B7FFF',
        accent: '#FF6B6B',
        surface: '#1E1B3A',
        background: '#0A0A0F',
        success: '#4ECB71',
        warning: '#FFB84D',
        error: '#FF5757',
        info: '#4D9FFF',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-border': 'gradient-border 3s ease infinite',
      },
      keyframes: {
        'gradient-border': {
          '0%, 100%': { 'border-color': '#5B4EE5' },
          '50%': { 'border-color': '#FF6B6B' }
        }
      }
    },
  },
  plugins: [],
}