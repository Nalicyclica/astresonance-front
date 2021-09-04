module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 }
        },
        twinkleBase: {
          '0%': {boxShadow: "0 0 100px rgba(255, 255, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.9)"},
          '100%': {boxShadow: "0 0 50px rgba(255, 255, 255, 0.9), inset 0 0 50px rgba(255, 255, 255, 0.7)"}
        },
        twinkleGold: {
          '0%': {boxShadow: "0 0 20px rgba(255, 225, 128, 0.9)"},
          '100%': {boxShadow: "0 0 10px rgba(255, 225, 128, 0.2)"}
        },
        twinkleEclipse: {
          '0%': {boxShadow: "0 0 5px rgba(255, 225, 128, 0), inset 0 0 5px rgba(255, 225, 128, 0)"},
          '100%': {boxShadow: "0 0 20px rgba(255, 225, 128, 1), inset 0 0 10px rgba(255, 225, 128, 1)"}
        },
      },
      animation: {
        blink: 'blink 2s ease-in-out infinite alternate',
        darkblink: 'darkblink 10s linear infinite',
        brightblink: 'brightblink 2s linear infinite',
        spin3s: 'spin 3s linear infinite',
        spin5s: 'spin 5s linear infinite',
        spin3sInv: 'spin 3s linear infinite reverse',
        spin5sInv: 'spin 5s linear infinite reverse',
        twinkleBase: 'twinkleBase 4s ease-in-out infinite alternate',
        twinkleGold: 'twinkleGold 4s ease-in-out infinite alternate',
        twinkleEclipse: 'twinkleEclipse 7s ease-in-out infinite alternate',
        spinBlinkOne: 'blink 3s ease-in-out infinite alternate, spin 10s linear infinite',
        spinBlinkTwo: 'blink 5s ease-in-out infinite alternate, spin 8s linear infinite reverse',
      },
      boxShadow: {
        'header': '0 2px 10px rgb(5,8,12)',
        'bright': '0 0 5px rgba(255, 255, 255, 0.9)',
        'gold': '0 0 10px rgba(255, 225, 128, 0.9)',
        'blueInnerOne': "inset 15px 25px 60px rgba(64, 255, 255, 0.75)",
        'redInnerOne': "inset 25px 15px 60px rgba(255, 100, 200, 0.75)",
        'half': '0 10px 10px 0 5px rgba(255, 255, 255, 0.9)',
      },
      width: {
        '120' : '30rem',
        '160' : '40rem',
        '200' : '50rem',
      },
      height: {
        'main' : 'calc(100vh - 5rem)',
        'home' : 'calc(100vh - 5rem - 5rem)',
        '120' : '30rem',
        '160' : '40rem',
        '200' : '50rem',
      },
      minWidth: {
        '120': '30rem'
      },
      fontFamily: {
        'sawarabi' : 'Sawarabi Mincho, sans-serif',
      }
    },
  },
  variants: {
    extend: {},
    boxShadow: ['hover', 'focus'],
    height: ['hover'],
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-ar": {
          textShadow: "0px 2px 1px white",
          textShadow: "2px 0px 1px white",
          textShadow: "0px -2px 1px white",
          textShadow: "-2px 0px 1px white",
        },
        ".text-shadow-black": {
          textShadow: "1px 2px 3px black"
        },
        ".text-shadow-none": {
          textShadow: "none"
        }
      };

      addUtilities(newUtilities);
    }
  ],
  important: true,
}
