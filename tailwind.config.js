/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Mocha (Now Deep Void/Slate for Dark Mode Base)
        'mocha': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617', // Deepest Black
        },
        // Aurora (Now Fluorescent Neon Lime)
        'aurora': {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#4dff91', // Main Neon Green (Official Restoration)
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
        },
        // Secondary Neon Cyan
        'neon': {
          cyan: '#00f3ff',
          pink: '#ff00ff',
        }
      },
      fontFamily: {
        sans: ['var(--font-lexend)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backdropBlur: {
        glass: '16px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mocha': 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #4dff91 0%, #00f3ff 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(77, 255, 145, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(77, 255, 145, 0.6), 0 0 10px #4dff91',
          },
        },
      },
    },
  },
  plugins: [],
}
