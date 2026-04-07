import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        righteous: ['var(--font-righteous)'],
        poppins: ['var(--font-poppins)'],
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0A0A0F',
          primary: '#1E1B4B',
          secondary: '#312E81',
          accent: '#F97316',
          text: '#F8FAFC',
        },
      },
      animation: {
        'float-slow': 'float 25s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(80px, -60px)' },
          '66%': { transform: 'translate(-40px, 40px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.2', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
