import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        chalk: '#F2F2F2',
        slate: '#1A1A1A',
        earth: '#003366',
        flint: '#6B7280',
        moss: '#A04035',
        ink: '#1A1A1A',
        colza: '#FFD700',
      },
      fontFamily: {
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
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
