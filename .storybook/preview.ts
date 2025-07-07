import type { Preview } from '@storybook/react-vite';
import '../lib/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        gray: { name: 'Gray', value: '#F0F2F5' },
        white: { name: 'White', value: '#FFFFFF' },
      },
    },
    initialGlobals: {
      backgrounds: { value: 'white' },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '414px',
            height: '736px',
          },
          type: 'mobile',
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '1024px',
          },
          type: 'desktop',
        },
        fullwidth: {
          name: 'Full width',
          styles: {
            width: '100%',
            height: '100%',
          },
          type: 'desktop',
        },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: 'Getting Started',
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
