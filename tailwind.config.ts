import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['./resources/**/*.edge', './resources/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F0F4FF',
          200: '#D9E2FF',
          300: '#A6C1FF',
          400: '#598BFF',
          500: '#3366FF',
          600: '#274BDB',
          700: '#1A34B8',
          800: '#102694',
          900: '#091A7A',
        },
      },
    },
  },
};
