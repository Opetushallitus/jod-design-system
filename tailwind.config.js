/** @type {import('tailwindcss').Config} */
export default {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    screens: {
      lg: '1440px',
    },
    // https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A6241
    colors: {
      accent: '#697077',
      'secondary-1': '#c1c7cd',
      'secondary-2': '#a2a9b0',
      'secondary-3': '#878d96',
      'secondary-4': '#697077',
      white: '#ffffff',
      black: '#000000',
      'primary-gray': '#333333',
      'secondary-gray': '#767676',
      link: '#595959',
      'inactive-gray': '#a9a9a9',
      'border-gray': '#cfcfcf',
      'bg-gray': '#f5f5f5',
      alert: '#e02929',
      warning: '#f2c832',
      success: '#2e8546',
    },
    // https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A6281
    fontSize: {
      hero: ['54px', { fontWeight: '900', lineHeight: '110%', letterSpacing: '-1.08px' }], // Hero
      'heading-1': ['42px', { fontWeight: '700', lineHeight: '110%', letterSpacing: '-1.26px' }], // Headline 1
      'heading-2': ['32px', { fontWeight: '700', lineHeight: '110%', letterSpacing: '-0.64px' }], // Headline 2
      'heading-3': ['24px', { fontWeight: '700', lineHeight: '120%', letterSpacing: '-0.24px' }], // Headline 3
      'heading-4': ['20px', { fontWeight: '700', lineHeight: '110%' }], // Headline 4
      'heading-5': ['16px', { fontWeight: '700', lineHeight: '110%' }], // Headline 5
      'body-lg': ['18px', { fontWeight: '500', lineHeight: '140%' }], // Body L
      'body-md': ['16px', { fontWeight: '500', lineHeight: '140%' }], // Body M
      'body-sm': ['14px', { fontWeight: '500', lineHeight: '140%' }], // Body S
      'body-xs': ['12px', { fontWeight: '700', lineHeight: '140%' }], // Body XS
      'form-label': ['14px', { fontWeight: '700', lineHeight: '110%' }], // Form label
      help: ['12px', { fontWeight: '500', lineHeight: '110%' }], // Help, hint
      'button-lg': ['20px', { fontWeight: '700', lineHeight: '110%' }], // Button L
      'button-md': ['16px', { fontWeight: '700', lineHeight: '110%', letterSpacing: '0.16px' }], // Button M
      'button-sm': ['14px', { fontWeight: '700', lineHeight: '110%', letterSpacing: '0.28px' }], // Button S
      tag: ['12px', { fontWeight: '500', lineHeight: '110%', letterSpacing: '0.12px' }], // Tag
    },
    // https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A6656
    spacing: {
      0: '0px', // None
      1: '2px',
      2: '4px',
      3: '8px',
      4: '12px',
      5: '16px',
      6: '24px',
      7: '32px',
      8: '40px',
      9: '48px',
      10: '56px',
      11: '64px',
    },
  },
  plugins: [],
};
