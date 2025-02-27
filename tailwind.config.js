/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        'accent-1': 'hsl(var(--accent-1))',
        'accent-2': 'hsl(var(--accent-2))',
        tagline: 'hsl(var(--tagline))',
      },
      textShadow: {
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'gradient': 'gradient 6s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.6)',
        },
      });
    },
  ],
}