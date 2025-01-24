import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import '../lib/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'JOD UI background',
      values: [
        {
          name: 'JOD UI background',
          value: '#f0f2f5',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
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
        order: 'Getting Started',
      },
    },
  },

  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],

  tags: ['autodocs'],
};

export default preview;
