/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutrals from Design Constitution
        neutral: {
          50: '#f8fafc',
          100: '#e6e9ef',
          200: '#cbd0dd',
          300: '#a0a8b8',
          400: '#717a8f',
          500: '#4a5266',
          600: '#323847',
          700: '#222835',
          800: '#141a26',
          900: '#0a0f1a',
        },
        // Signal colors
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        danger: {
          500: '#ef4444',
        },
        info: {
          500: '#60a5fa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '24px',
        6: '32px',
        7: '48px',
        8: '64px',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '6px',
      },
    },
  },
  plugins: [],
};