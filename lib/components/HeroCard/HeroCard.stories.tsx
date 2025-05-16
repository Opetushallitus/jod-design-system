import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';

import { HeroCard } from './HeroCard';

const meta = {
  title: 'Cards/HeroCard',
  component: HeroCard,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof HeroCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LargeWithActionButton: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=11906-38871',
    },
    docs: {
      description: {
        story: 'This is a large version with the action button.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
  args: {
    size: 'lg',
    title: 'Tervetuloa Osaamispolkuun!',
    content:
      'Elämä on jatkuvaa muutosta ja uudistumista. Olipa kyse uran vaihdosta, uuden osaamisen oppimisesta tai henkilökohtaisen elämäntilanteen parantamisesta, me tarjoamme sinulle tiedon ja inspiraation joita tarvitset.',
    backgroundColor: '#006DB3',
    buttonLabel: 'Tutustu Osaamispolkuun',
    to: '#',
    LinkComponent: ({ to, children, className }) => (
      <a className={className} href={to as string}>
        {children}
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <div className="ds:max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const LargeWithoutButton: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=11906-38871',
    },
    docs: {
      description: {
        story: 'This is large version without the action button.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
  args: {
    size: 'lg',
    title: 'Tutki mahdollisuuksiasi, suunnittele polkusi ja luo tulevaisuutesi Osaamispolussasi.',
    content:
      'Elämä on jatkuvaa muutosta ja uudistumista. Olipa kyse uran vaihdosta, uuden osaamisen oppimisesta tai henkilökohtaisen elämäntilanteen parantamisesta, me tarjoamme sinulle tiedon ja inspiraation joita tarvitset.',
    backgroundColor: '#006DB3',
  },
  decorators: [
    (Story) => (
      <div className="ds:max-w-[716px]">
        <Story />
      </div>
    ),
  ],
};

export const SmallWithActionButton: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=541%3A4604',
    },
    docs: {
      description: {
        story: 'This is a secondary hero card component with a link.',
      },
    },
  },
  args: {
    size: 'sm',
    to: '#',
    title: 'Ohjaajan osio',
    LinkComponent: ({ to, children }) => <a href={to as string}>{children}</a>,
    buttonLabel: 'Ohjaajan osioon',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    backgroundColor: '#00A8B3',
  },
  decorators: [
    (Story) => (
      <div className="ds:max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const Hero: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=11906-38871',
    },
    docs: {
      description: {
        story: 'This is a hero component with multiple hero card components.',
      },
    },
    backgrounds: {
      default: 'light',
    },
    layout: 'fullscreen',
  },
  args: {
    title: 'Tervetuloa Osaamispolkuun!',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    buttonLabel: 'Tutustu Osaamispolkuun',
    backgroundColor: '#006DB3',
    to: '#',
    LinkComponent: ({ to, children, className }) => (
      <a className={className} href={to as string}>
        {children}
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <div className="ds:h-[650px] ds:justify-center ds:mx-auto ds:flex ds:flex-row ds:items-center ds:p-5 ds:sm:p-8 ds:xl:container">
        <div className="ds:max-w-[1140px] ds:grid ds:cols-3 ds:justify-start ds:flex-1">
          <div className="ds:max-w-[716px] ds:col-span-3 ds:sm:col-span-2">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};
