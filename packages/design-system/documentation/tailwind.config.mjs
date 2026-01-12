/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          darker: 'var(--color-primary-darker)',
          darkest: 'var(--color-primary-darkest)',
          light: 'var(--color-primary-light)',
          lighter: 'var(--color-primary-lighter)',
          lightest: 'var(--color-primary-lightest)',
        },
      },
    },
  },
  plugins: [],
};
