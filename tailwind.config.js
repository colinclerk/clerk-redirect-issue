const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          DEFAULT: '#be39ee',
          50: '#fcf3ff',
          100: '#f9e9ff',
          200: '#f0c8ff',
          300: '#eebdff',
          400: '#d981f9',
          500: '#cc63f1',
          600: '#c04dea',
          700: '#a430ce',
          800: '#851faa',
          900: '#6c2e83',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
