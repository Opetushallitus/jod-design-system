import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../lib/**/*.mdx',
    {
      directory: '../lib/components',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)',
      titlePrefix: 'Components',
    },
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-designs',
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  docs: {
    defaultName: 'Documentation',
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
