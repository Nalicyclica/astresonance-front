module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 }
        },
      },
      animation: {
        blink: 'blink 2s ease-in-out infinite alternate'
      },
      boxShadow: {
        'rd': 'inset 0 0 45px rgba(0,0,0,0.8)',
        'bright': '0 0 5px rgba(255, 255, 255, 0.9)',
        'gold': '0 0 10px rgba(255, 225, 128, 0.9)',
      },
    },
  },
  variants: {
    extend: {},
    // backdropContrast: ['hover'],
    boxShadow: ['hover', 'focus']
  },
  plugins: [
  ],
}
