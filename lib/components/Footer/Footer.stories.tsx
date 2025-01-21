import type { Meta, StoryObj } from '@storybook/react';

import { Footer, type FooterProps } from './Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'desktop',
  },
};

const items: FooterProps['items'] = [
  {
    key: 'about',
    component: ({ className }) => (
      <a href="/about" className={className}>
        Tietoa palvelusta ja käyttöohjeet
      </a>
    ),
  },
  {
    key: 'cookies',
    component: ({ className }) => (
      <a href="/cookies" className={className}>
        Evästekäytäntö
      </a>
    ),
  },
  {
    key: 'sources',
    component: ({ className }) => (
      <a href="/sources" className={className}>
        Datalähteet
      </a>
    ),
  },
  {
    key: 'terms',
    component: ({ className }) => (
      <a href="/terms" className={className}>
        Käyttöehdot
      </a>
    ),
  },
  {
    key: 'accessibility',
    component: ({ className }) => (
      <a href="/accessibility" className={className}>
        Saavutettavuusseloste
      </a>
    ),
  },
  {
    key: 'privacy',
    component: ({ className }) => (
      <a href="/privacy" className={className}>
        Tietosuojaseloste
      </a>
    ),
  },
];

const copyright = '© JOD 2024. Kaikki oikeudet pidätetään.';

export const Light: Story = {
  parameters: {
    ...parameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8163',
    },
    docs: {
      description: {
        story: 'This is a light footer component with navigation items.',
      },
    },
  },
  args: {
    items,
    language: 'fi',
    copyright,
  },
};

export const Dark: Story = {
  parameters: {
    ...parameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8189',
    },
    docs: {
      description: {
        story: 'This is a dark footer component with navigation items.',
      },
    },
    backgrounds: {
      default: 'jod-black',
      values: [{ name: 'jod-black', value: '#000000' }],
    },
  },
  args: {
    items,
    language: 'fi',
    copyright,
    variant: 'dark',
  },
};

export const MobileDark: Story = {
  parameters: {
    ...parameters,
    viewport: {
      defaultViewport: 'mobile',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=746%3A44679',
    },
    docs: {
      description: {
        story: 'This is a mobie footer component with navigation items.',
      },
    },
    backgrounds: {
      default: 'jod-black',
      values: [{ name: 'jod-black', value: '#000000' }],
    },
  },
  args: {
    items,
    language: 'fi',
    copyright,
    variant: 'dark',
  },
};
