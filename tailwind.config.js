/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Deep medical blue/teal — primary brand palette
        brand: {
          950: '#04202A',
          900: '#062B38',
          800: '#0A3D4E',
          700: '#0E5266',
          600: '#136B82',
          500: '#18869F', // primary accent
          400: '#3BA6BC',
          300: '#7CC5D6',
          100: '#DCF0F4',
          50: '#F1FAFC',
        },
        // Semantic status colors
        critical: {
          DEFAULT: '#DC2626',
          bg: '#FEF2F2',
          border: '#FECACA',
        },
        warning: {
          DEFAULT: '#D97706',
          bg: '#FFFBEB',
          border: '#FDE68A',
        },
        healthy: {
          DEFAULT: '#15803D',
          bg: '#F0FDF4',
          border: '#BBF7D0',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(6, 43, 56, 0.04), 0 1px 6px -1px rgba(6, 43, 56, 0.08)',
        popover: '0 8px 30px -6px rgba(6, 43, 56, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
