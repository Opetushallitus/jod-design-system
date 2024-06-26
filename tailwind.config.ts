import type { Config } from 'tailwindcss';

export default {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        arial: ['Arial', 'sans-serif'], // Default font
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    screens: {
      sm: '640px',
      lg: '1440px',
    },
    // https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5250
    colors: {
      accent: '#006db3',
      'secondary-1': '#339ddf',
      'secondary-2': '#00a8b3',
      'secondary-3': '#ee7c45',
      'secondary-4': '#cd4eb3',
      'secondary-5': '#d8d8d8',
      white: '#ffffff',
      black: '#000000',
      'secondary-gray': '#6e6e6e',
      link: '#006db3',
      'inactive-gray': '#a9a9a9',
      'border-gray': '#cecece',
      'bg-gray': '#f0f2f5',
      'bg-gray-2': '#e4e6ec',
      alert: '#e3564f',
      'alert-text': '#de342b',
      success: '#00c181',
    },
    // https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5279
    fontSize: {
      'heading-1': ['36px', { fontWeight: '600', lineHeight: '50px' }], // Headline 1
      'heading-2': ['24px', { fontWeight: '600', lineHeight: '34px' }], // Headline 2
      'heading-3': ['18px', { fontWeight: '600', lineHeight: '27px' }], // Headline 3
      'heading-4': ['16px', { fontWeight: '600', lineHeight: '24px' }], // Headline 4
      'heading-5': ['16px', { fontWeight: '400', lineHeight: '24px' }], // Headline 5
      'body-lg': ['18px', { fontWeight: '400', lineHeight: '26px' }], // Body L
      'body-md': ['16px', { fontWeight: '400', lineHeight: '24px' }], // Body M
      'body-sm': ['14px', { fontWeight: '400', lineHeight: '20px' }], // Body S
      'body-xs': ['12px', { fontWeight: '400', lineHeight: '16px' }], // Body XS
      'form-label': ['16px', { fontWeight: '700', lineHeight: '24px' }], // Form label
      help: ['16px', { fontWeight: '400', lineHeight: '24px' }], // Help, hint
      'button-lg': ['24px', { fontWeight: '600', lineHeight: '34px' }], // Button L
      'button-md': ['16px', { fontWeight: '600', lineHeight: '24px', letterSpacing: '0.16px' }], // Button M
      'button-sm': ['14px', { fontWeight: '600', lineHeight: '18px', letterSpacing: '0.28px' }], // Button S
      tag: ['14px', { fontWeight: '400', lineHeight: '16px' }], // Tag
      'attrib-title': ['12px', { fontWeight: '400', lineHeight: '110%', letterSpacing: '1%' }], // Attribute title
      'attrib-value': ['12px', { fontWeight: '700', lineHeight: '110%', letterSpacing: '0.12px' }], // Attribute value
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
} satisfies Config;
