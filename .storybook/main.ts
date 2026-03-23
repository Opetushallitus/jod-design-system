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

  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-themes', '@storybook/addon-docs'],

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

  viteFinal: (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      return {
        ...config,
        plugins: (config.plugins ?? []).filter(
          (plugin) =>
            !(
              plugin &&
              typeof plugin === 'object' &&
              'name' in plugin &&
              plugin.name === 'builtin:esm-external-require'
            ),
        ),
      };
    }
    return config;
  },
};
export default config;
