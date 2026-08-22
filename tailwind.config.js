/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#0F2747',
          50: '#F0F5FA',
          100: '#E1EBF5',
          800: '#13335D',
          900: '#0F2747',
          950: '#0A1B32',
        },
        'primary-blue': {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
          50: '#EFF6FF',
        },
        'soft-blue': {
          DEFAULT: '#CFEAFF',
          light: '#E2F3FF',
          dark: '#B0DCFF',
        },
        'light-blue': {
          DEFAULT: '#EAF6FF',
          light: '#F4FAFF',
        },
        'dark-text': {
          DEFAULT: '#172B4D',
          muted: '#5E6C84',
          subtle: '#8993A4',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 39, 71, 0.06), 0 2px 6px -1px rgba(15, 39, 71, 0.04)',
        'soft-lg': '0 12px 32px -4px rgba(15, 39, 71, 0.08), 0 4px 12px -2px rgba(15, 39, 71, 0.04)',
        'blue-glow': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'cyan-glow': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
        'card': '0 2px 12px rgba(15, 39, 71, 0.05)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
