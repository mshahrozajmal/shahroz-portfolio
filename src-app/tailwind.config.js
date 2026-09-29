/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette comes from index.css so every utility follows Daylight /
        // Midnight. The <alpha-value> placeholder keeps opacity modifiers
        // (text-ink/90, border-cyan/40) working in both modes.
        bg1: 'rgb(var(--bg1-rgb) / <alpha-value>)',
        bg2: 'rgb(var(--bg2-rgb) / <alpha-value>)',
        cyan: 'rgb(var(--cyan-rgb) / <alpha-value>)',
        green: 'rgb(var(--green-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        slate: 'rgb(var(--slate-rgb) / <alpha-value>)',
        card: 'rgb(var(--card-rgb) / <alpha-value>)',
        line: 'rgb(var(--line-rgb) / <alpha-value>)',
        crit: 'rgb(var(--crit-rgb) / <alpha-value>)',
        high: 'rgb(var(--high-rgb) / <alpha-value>)',
        med: 'rgb(var(--med-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
      },
      borderRadius: {
        xl2: '20px',
      },
    },
  },
  plugins: [],
}
