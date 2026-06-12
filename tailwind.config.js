/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sazu: {
          black:    '#080808',
          void:     '#0D0D0D',
          surface:  '#111111',
          elevated: '#181818',
          border:   '#222222',
          muted:    '#333333',
          purple:   '#5B4FE8',
          'purple-light': '#7B70FF',
          'purple-dim':   '#2D2780',
          'purple-glow':  'rgba(91,79,232,0.15)',
          white:    '#F5F3EF',
          'off-white': '#B8B4AE',
          ghost:    '#5A5754',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  safelist: ['group-hover:text-sazu-purple', 'text-sazu-purple'],
  plugins: [],
}
