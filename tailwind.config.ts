import type { Config } from 'tailwindcss';

export default {
  prefix: 'ds-',
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        arial: ['Arial', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '20px',
        full: '9999px',
      },
      boxShadow: {
        border: '0 1px 1px 1px rgba(0, 0, 0, 0.1)',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1440px',
    },
    // https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5250
    colors: {
      accent: {
        DEFAULT: '#006db3',
        75: '#4091c6',
        50: '#80b6d9',
        25: '#bfdbec',
      },
      tag: {
        tyopaikka: '#E6A6D9',
        koulutus: '#80D3D9',
        'vapaa-ajan-toiminto': '#99CEEF',
        'jotain-muuta': '#D8D8D8',
        kiinnostus: '#F7BDA2',
        rajoitus: '#F7A2A7',
      },
      'secondary-1': {
        DEFAULT: '#339ddf',
        75: '#66b5e7',
        50: '#99ceef',
        25: '#c2e2f5',
      },
      'secondary-2': {
        DEFAULT: '#00a8b3',
        50: '#80d3d9',
      },
      'secondary-3': {
        DEFAULT: '#ee7c45',
        50: '#f7bda2',
      },
      'secondary-4': {
        DEFAULT: '#cd4eb3',
        50: '#e6a6d9',
      },
      'secondary-5': '#d8d8d8',
      white: '#ffffff',
      black: '#000000',
      'secondary-gray': '#6e6e6e',
      link: '#006db3',
      'inactive-gray': '#a9a9a9',
      'border-gray': '#cecece',
      'bg-gray': '#f0f2f5',
      'bg-gray-2': {
        DEFAULT: '#e4e6ec',
        25: '#f8f9fa',
      },
      warning: '#f2c832',
      alert: '#e3564f',
      'alert-text': '#de342b',
      success: '#00c181',
    },
    // https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5279
    fontSize: {
      'heading-1': ['36px', { fontWeight: '600', lineHeight: '50px' }], // Headline 1
      'heading-1-mobile': ['32px', { fontWeight: '600', lineHeight: '44px' }], // Headline 1, mobile
      'heading-2': ['24px', { fontWeight: '600', lineHeight: '34px' }], // Headline 2
      'heading-2-mobile': ['22px', { fontWeight: '600', lineHeight: '30px' }], // Headline 2, mobile
      'heading-3': ['18px', { fontWeight: '600', lineHeight: '27px' }], // Headline 3
      'heading-3-mobile': ['16px', { fontWeight: '600', lineHeight: '24px' }], // Headline 3, mobile
      'heading-4': ['16px', { fontWeight: '600', lineHeight: '24px' }], // Headline 4
      'heading-4-mobile': ['14px', { fontWeight: '600', lineHeight: '24px' }], // Headline 4, mobile
      'heading-5': ['16px', { fontWeight: '400', lineHeight: '24px' }], // Headline 5
      'body-lg': ['18px', { fontWeight: '400', lineHeight: '26px' }], // Body L (ingressi)
      'body-lg-mobile': ['16px', { fontWeight: '400', lineHeight: '24px' }], // Body L, mobile (ingressi)
      'body-md': ['16px', { fontWeight: '400', lineHeight: '24px' }], // Body M (leipäteksti)
      'body-md-mobile': ['15px', { fontWeight: '400', lineHeight: '23px' }], // Body M, mobile (leipäteksti)
      'body-sm': ['14px', { fontWeight: '400', lineHeight: '20px' }], // Body S (pieniteksti)
      'body-sm-mobile': ['13px', { fontWeight: '400', lineHeight: '19px' }], // Body S, mobile (pieniteksti)
      'body-xs': ['12px', { fontWeight: '400', lineHeight: '16px' }], // Body XS
      'form-label': ['16px', { fontWeight: '700', lineHeight: '24px' }], // Form label
      help: ['16px', { fontWeight: '400', lineHeight: '24px' }], // Help, hint
      'button-lg': ['24px', { fontWeight: '600', lineHeight: '34px' }], // Button L
      'button-md': ['16px', { fontWeight: '600', lineHeight: '24px', letterSpacing: '0.16px' }], // Button M
      'button-md-mobile': ['15px', { fontWeight: '600', lineHeight: '24px', letterSpacing: '0.15px' }], // Button M, mobile
      'button-sm': ['14px', { fontWeight: '600', lineHeight: '18px', letterSpacing: '0.28px' }], // Button S
      'button-sm-mobile': ['12px', { fontWeight: '600', lineHeight: '14px', letterSpacing: '0.28px' }], // Button S, mobile
      tag: ['14px', { fontWeight: '400', lineHeight: '20px' }], // Tag
      'attrib-title': ['12px', { fontWeight: '400', lineHeight: '110%', letterSpacing: '0.12px' }], // Attribute title
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
