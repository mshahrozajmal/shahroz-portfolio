/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg1: '#0C1018',
        bg2: '#06090F',
        cyan: '#22D3EE',
        green: '#34D399',
        ink: '#EAF1F8',
        slate: '#8DA2BC',
        card: '#111826',
        line: '#26374D',
        crit: '#F2616B',
        high: '#F5A524',
        med: '#22D3EE',
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
