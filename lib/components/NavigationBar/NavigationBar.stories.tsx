import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';
import { NavigationBar } from './NavigationBar';

const meta = {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'desktop',
  },
};

export const Default: Story = {
  parameters: {
    ...parameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8027',
    },
    docs: {
      description: {
        story: 'This is a light navigation bar with logo, menu, language, and user buttons.',
      },
    },
  },
  args: {
    languageButtonComponent: <></>,
    userButtonComponent: <></>,
    renderLink: ({ children }) => <a href="#">{children}</a>,
    logo: {
      to: '/',
      language: 'fi',
      srText: 'JOD',
    },
  },
};
