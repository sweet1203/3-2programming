/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          graphite: '#1d1d1f',
          deep: '#333333',
          charcoal: '#474747',
          medium: '#707070',
          light: '#858585',
          silver: '#c7c7c7',
          border: '#d6d6d6',
          surface: '#e2e2e5',
          canvas: '#f5f5f7',
          white: '#ffffff',
          black: '#000000',
          interactive: '#0071e3',
          action: '#0066cc',
          sky: '#2997ff',
          pale: '#9fc6f4',
        },
      },
      boxShadow: {
        apple: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
      },
      borderRadius: {
        apple: '8px',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
