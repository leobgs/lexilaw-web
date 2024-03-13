const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        customAni: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(75%)' },
        },
      },
      animation: {
        right: 'customAni 0.8s linear 0s 1;',
      },
      fontSize: {
        xxs: '10px',
      },
      dropShadow: {
        primary: '0 3px 12px rgba(255, 218, 0, 0.25)',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      secondary: {
        base: '#004225',
        darker: '#DF8271',
        light: '#F4D7D2',
      },
      primary: {
        light: '#FDFDFD',
        base: '#FFFFFF',
        darker: '#F8F8F8',
      },
      black: {
        lightest: '#232323',
        lighter: '#919191',
        light: '#5E5E5E',
        base: '#646464',
        dark: '#1A1517',
        darker: '#070505',
        pure: '#000000',
      },
      dark: {
        50: '#2E2C2B'
      },
      blue: { sky: '#8DC3DE' },
      purple: { base: '#783B82' },
      neutral: {
        10: '#F9F9F9',
        20: '#E6E6E6',
        30: '#B3B3B3',
        40: '#808080',
        50: '#F1F1F1',
      },
      active: '#178EE9',
      error: { base: '#DB0707', lighter: '#CF1C1C' },
      success: '#06B73A',
      screen: '#F8F7F6',
      green: {
        900: '#004225',
      },
      gray: {
        50: '#FDFDFD',
        100: '#DEDEDE',
        400: '#A8A8A8',
        700: '#5A5A5A',
      },
      yellow: {
        50: '#E0DBD1'
      }
    },
    fontFamily: {
      bold: 'Inter Bold',
      medium: 'Inter Medium',
      regular: 'Inter Regular',
      'semi-bold': 'Inter SemiBold',
      futura: 'Futura Regular',
      'futura-bold': 'Futura Bold',
    },
    content: {
      width: '100vw',
      height: '100vh',
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.safe-top': {
          paddingTop: 'constant(safe-area-inset-top)',
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          paddingBottom: 'constant(safe-area-inset-bottom)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      })
    }),
  ],
}
