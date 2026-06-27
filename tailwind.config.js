module.exports = {
  darkMode: 'class',
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent-primary)',
        glow: 'var(--accent-glow)',
        warm: 'var(--accent-warm)',
        'success-cv': 'var(--success)',
        code: 'var(--code-bg)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      maxWidth: {
        cv: '72rem',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      keyframes: {
        'shimmer-slide': {
          to: { transform: 'translate(100%, 0)' },
        },
        'spin-around': {
          to: { transform: 'rotate(360deg)' },
        },
        'shiny-text': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '200% 0' },
        },
        rippling: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
        ripple: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.1)' },
        },
        'cv-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
        'spin-around': 'spin-around var(--speed) linear infinite',
        'shiny-text': 'shiny-text 8s infinite',
        rippling: 'rippling var(--duration) ease-out',
        ripple: 'ripple 3s ease-in-out infinite',
        'cv-float': 'cv-float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
