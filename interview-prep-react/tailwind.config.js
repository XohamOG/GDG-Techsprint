/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ['Caveat', 'cursive'],
        marker: ['Permanent Marker', 'cursive'],
        comic: ['Comic Neue', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bob': 'bob 4s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'draw': 'draw 0.8s ease-out forwards',
        'draw-delay-1': 'draw 0.8s ease-out 0.2s forwards',
        'draw-delay-2': 'draw 0.8s ease-out 0.4s forwards',
        'draw-delay-3': 'draw 0.8s ease-out 0.6s forwards',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'bounce-in': 'bounceIn 0.6s ease-out forwards',
        'rotate-sketch': 'rotateSketch 20s linear infinite',
        'splash-fade': 'splashFade 2s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        draw: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateSketch: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        splashFade: {
          '0%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0', display: 'none' },
        },
      },
    },
  },
  plugins: [],
}
