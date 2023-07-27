import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export const content = [
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  extend: {
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
    },
  },
}
export const plugins = []
