import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        secondary: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
          950: '#171717',
        },
        dark: {
          100: '#262626',
          200: '#171717',
          300: '#0a0a0a',
          400: '#050505',
          500: '#000000',
        },
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-lg': '0 0 30px rgba(255, 255, 255, 0.12)',
        'glow-xl': '0 0 40px rgba(255, 255, 255, 0.15)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h40v1H0zM0 0v40h1V0zM39 0v40h1V0zM0 39h40v1H0z\'/%3E%3C/g%3E%3C/svg%3E")',
        'circuit-pattern': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 304 304\' width=\'304\' height=\'304\'%3E%3Cpath fill=\'%23ffffff\' fill-opacity=\'0.05\' d=\'M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-208a5 5 0 1 1-2 0V0h2v12.1zM80 84.1a5 5 0 1 1 0-2h2v2h-2zm-48 0a5 5 0 1 1 0-2h2v2h-2zM0 160h4.1c.4 0 .8-.2 1-.4l10-12.5c.3-.4.2-1-.1-1.4l-11-10.5c-.2-.3-.6-.4-1-.4H0v24.9zM0 110.9h4.1c.4 0 .8-.2 1-.4l24.7-29.7c.4-.5.1-1.3-.5-1.4l-22.7-3.8c-.3 0-.7.1-.9.4L0 107.1v3.8zm1.3 38.9c-.3-.3-.7-.4-1-.4H0v22.9h7.1c.4 0 .8-.2 1-.4l19.8-20.5c.4-.4.3-1.1-.1-1.4l-20.3-15.4c-.3-.3-.7-.4-1-.4-1.2 0-1.7 1.4-.9 2.1L22 88.3c.3.3.7.4 1 .4h7.1c.4 0 .8-.2 1-.4L60 50.2c.3-.3.4-.7.4-1.1 0-1.1-1-1.7-1.8-1.2L27.7 56.7c-.3.2-.8.1-1.1-.1L4.2 39.1c-.3-.3-.7-.4-1-.4-1 0-1.7 1.1-1.2 2l13 25.4c.2.4.1.9-.2 1.2L0 86.5v9.8zm14.4 37.8L33.9 202c.3.4.1.8-.3 1l-38.4 24.7v-46.8l34.7-22.1c.3-.2.5-.5.5-.9 0-.6-.6-1-1.1-.7l-34.1 21.8v-8l7.1-4.5c.3-.2.4-.5.4-.8 0-.5-.4-1-.9-.9L0 152v-16.8l10.1-6.5 24.3 16.6c.3.2.7.2 1 0l21.2-9.7c.4-.2.6-.6.6-1 0-.7-.7-1.1-1.3-.8L34.7 144l-9.9-6.8c-.3-.2-.3-.6-.1-.9l9.9-11.8c.2-.3.2-.7 0-1s-.6-.4-.9-.2l-9.8 5.3c-.2.1-.4.1-.5 0l-7.9-7c-.4-.3-.8-.3-1.1.1L0 134.6v19.7l15.7-1z\'/%3E%3C/svg%3E")',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
        'spin-slower': 'spin 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast':  'float 4s ease-in-out infinite',       // faster loop
        'float-big':   'float 8s ease-in-out infinite',       // same speed, bigger drift
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-slow': 'fadeIn 2s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
