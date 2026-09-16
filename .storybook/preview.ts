import type { Preview } from '@storybook/react-vite';

import '../lib/index.css';

/**
 * Storybook's test instrumentation replaces HTMLElement.prototype.focus with an
 * accessor whose getter assumes `this` is an element. @headlessui/react reads the
 * prototype method at module scope (setupGlobalFocusEvents), which invokes that
 * getter with `this === HTMLElement.prototype` and throws "Illegal invocation",
 * breaking every story that renders a Headless UI component.
 *
 * Restoring focus as a plain data property sidesteps it. This disables Storybook's
 * focus tracking for interaction tests, which this project does not use.
 */
const unpatchFocus = () => {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus');
  if (!descriptor?.get) {
    return;
  }
  const realFocus = descriptor.get.call(document.createElement('div'));
  Object.defineProperty(HTMLElement.prototype, 'focus', {
    configurable: true,
    writable: true,
    value: realFocus,
  });
};

const preview: Preview = {
  loaders: [unpatchFocus],
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
      options: {
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
            height: '300px',
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
