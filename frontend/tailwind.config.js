/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '7rem',
      },
    },
    extend: {
      fontFamily: {
        'opensans': ['Open Sans'],
      },
      colors: {
        primary: {
          0: 'hsl(var(--hue-sat-primary) 0% / <alpha-value>)',
          10: 'hsl(var(--hue-sat-primary) 10% / <alpha-value>)',
          20: 'hsl(var(--hue-sat-primary) 20% / <alpha-value>)',
          30: 'hsl(var(--hue-sat-primary) 30% / <alpha-value>)',
          40: 'hsl(var(--hue-sat-primary) 40% / <alpha-value>)',
          50: 'hsl(var(--hue-sat-primary) 50% / <alpha-value>)',
          60: 'hsl(var(--hue-sat-primary) 60% / <alpha-value>)',
          70: 'hsl(var(--hue-sat-primary) 70% / <alpha-value>)',
          80: 'hsl(var(--hue-sat-primary) 80% / <alpha-value>)',
          90: 'hsl(var(--hue-sat-primary) 90% / <alpha-value>)',
          95: 'hsl(var(--hue-sat-primary) 95% / <alpha-value>)',
          99: 'hsl(var(--hue-sat-primary) 99% / <alpha-value>)',
          100: 'hsl(var(--hue-sat-primary) 100% / <alpha-value>)',
        },
        neutral: {
          10: '#1a1a1a',
          99: '#fcfcfc',
        },
        "dark": "#121212",
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto',
      },
      gridTemplateColumns: {
        'merch': '230px 1fr',
      }
    },
  },
  plugins: [],
}