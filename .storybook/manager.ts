import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  // https://storybook.js.org/docs/configure/theming#create-a-theme-quickstart
  theme: create({
    base: 'light',
    brandTitle: 'JOD Design System',
    brandUrl: 'https://github.com/Opetushallitus/jod-design-system',
    // brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
    brandTarget: '_self',
  }),
});
