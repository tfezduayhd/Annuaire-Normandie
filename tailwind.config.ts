import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        chalk: '#F5F2ED',
        slate: '#2C3340',
        earth: '#7A5C3E',
        flint: '#8A8C8F',
        moss: '#4A6741',
        ink: '#1A1C1E',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(56px, 8vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(40px, 6vw, 80px)', { lineHeight: '1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(28px, 4vw, 52px)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      spacing: {
        section: 'clamp(80px, 10vw, 160px)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
