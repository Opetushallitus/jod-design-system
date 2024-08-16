import type { Meta, StoryObj } from '@storybook/react';

import { HeroCard } from './HeroCard';

const meta = {
  title: 'Cards/HeroCard',
  component: HeroCard,
  tags: ['autodocs'],
} satisfies Meta<typeof HeroCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const secondaryCardArgs = {
  title: 'Tunnista osaamistasi ja tutki mahdollisuuksia',
  backgroundColor: '#00A8B3F2',
  href: '/',
  size: 'sm' as 'sm' | 'lg' | undefined,
  textColor: '#000',
};

export const Primary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2225-24513',
    },
    docs: {
      description: {
        story: 'This is a primary hero card component.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
  args: {
    title: 'Astu rohkeasti muutokseen! Tutki mahdollisuuksiasi, suunnittele polkusi ja luo tulevaisuutesi.',
    content:
      'Elämä on jatkuvaa muutosta ja uudistumista. Olipa kyse uran vaihdosta, uuden osaamisen oppimisesta tai henkilökohtaisen elämäntilanteen parantamisesta, me tarjoamme sinulle tiedon ja inspiraation joita tarvitset.',
    backgroundColor: '#006DB3F2',
    actionContent: 'Kokeile palvelua',
    arrowColor: '#006DB3',
    href: '/',
    onClick: () => console.log('Clicked'),
  },
  decorators: [
    (Story) => (
      <div className="ds-mb-[30px] ds-max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const PrimaryWithoutArrowsOrActions: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2225-24513',
    },
    docs: {
      description: {
        story: 'This is a primary hero card component without arrows or actions.',
      },
    },
    backgrounds: {
      default: 'light',
    },
  },
  args: {
    title: 'Amet sit dolor ipsum lorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui ac nunc tincidunt tincidunt. Nullam nec dui ac nunc tincidunt tincidunt.',
    backgroundColor: '#006DB3F2',
    arrowVisible: false,
    href: '/',
  },
  decorators: [
    (Story) => (
      <div className="ds-mb-[30px] ds-max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const Secondary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=541%3A4604',
    },
    docs: {
      description: {
        story: 'This is a secondary hero card component.',
      },
    },
  },
  args: secondaryCardArgs,
  decorators: [
    (Story) => (
      <div className="ds-max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const MultipleSecondary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=541%3A4574',
    },
    docs: {
      description: {
        story: 'Multiple hero card components.',
      },
    },
  },
  args: secondaryCardArgs,
  decorators: [
    (Story) => (
      <div className="ds-flex ds-flex-row ds-gap-[32px] lg:ds-container">
        <Story />
        <Story
          args={{
            ...secondaryCardArgs,
            title: 'Tutustu miten käytät palvelua ja luot oman tulevaisuutesi',
            backgroundColor: '#EE7C45F2',
          }}
        />
        <Story
          args={{
            ...secondaryCardArgs,
            title: 'Luo oma profiili ja suunnittele polkusi',
            backgroundColor: '#CD4EB3F2',
          }}
        />
      </div>
    ),
  ],
};

export const Hero: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=541%3A4574',
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
    title: 'Astu rohkeasti muutokseen! Tutki mahdollisuuksiasi, suunnittele polkusi ja luo tulevaisuutesi.',
    content:
      'Elämä on jatkuvaa muutosta ja uudistumista. Olipa kyse uran vaihdosta, uuden osaamisen oppimisesta tai henkilökohtaisen elämäntilanteen parantamisesta, me tarjoamme sinulle tiedon ja inspiraation joita tarvitset.',
    backgroundColor: '#006DB3F2',
    actionContent: 'Kokeile palvelua',
    href: '/',
    arrowColor: '#006DB3',
  },
  decorators: [
    (Story) => (
      <div className="ds-mx-auto ds-flex ds-flex-col ds-gap-[104px] ds-bg-[url('https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=2070')] ds-bg-[length:2000px_cover] ds-bg-[top_-6rem_left_-10rem] ds-p-8 lg:ds-container">
        <div className="ds-mb-[30px] ds-max-w-2xl">
          <Story />
        </div>
        <div className="ds-flex ds-flex-row ds-gap-[32px] lg:ds-container">
          <Story args={secondaryCardArgs} />
          <Story
            args={{
              ...secondaryCardArgs,
              title: 'Tutustu miten käytät palvelua ja luot oman tulevaisuutesi',
              backgroundColor: '#EE7C45F2',
            }}
          />
          <Story
            args={{
              ...secondaryCardArgs,
              title: 'Luo oma profiili ja suunnittele polkusi',
              backgroundColor: '#CD4EB3F2',
            }}
          />
        </div>
      </div>
    ),
  ],
};
