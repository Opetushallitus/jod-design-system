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
};

export const Primary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LP7Acqn5dNNHS0R1YUWM1n/cx_jod_sb?node-id=98%3A43037',
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
    href: '/',
  },
  decorators: [
    (Story) => (
      <div className="mb-[30px] max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const Secondary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LP7Acqn5dNNHS0R1YUWM1n/cx_jod_sb?node-id=98%3A43040',
    },
    docs: {
      description: {
        story: 'This is a secondary hero card component.',
      },
    },
  },
  args: {
    title: secondaryCardArgs.title,
    href: secondaryCardArgs.href,
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export const MultipleSecondary: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LP7Acqn5dNNHS0R1YUWM1n/cx_jod_sb?node-id=98%3A42967',
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
      <div className="grid grid-flow-row auto-rows-max grid-cols-3 gap-[32px] lg:container">
        <Story />
        <Story
          args={{
            title: 'Tutustu miten käytät palvelua ja luot oman tulevaisuutesi',
            backgroundColor: '#EE7C45F2',
            href: '/',
          }}
        />
        <Story args={{ title: 'Luo oma profiili ja suunnittele polkusi', backgroundColor: '#CD4EB3F2', href: '/' }} />
      </div>
    ),
  ],
};

export const Hero: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LP7Acqn5dNNHS0R1YUWM1n/cx_jod_sb?node-id=98%3A43037',
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
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex flex-col gap-[104px] bg-[url('https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=2070')] bg-[length:2000px_cover] bg-[top_-6rem_left_-10rem] p-8 lg:container">
        <div className="mb-[30px] max-w-2xl">
          <Story />
        </div>
        <div className="grid grid-flow-row auto-rows-max grid-cols-3 gap-[32px] lg:container">
          <Story args={secondaryCardArgs} />
          <Story
            args={{
              title: 'Tutustu miten käytät palvelua ja luot oman tulevaisuutesi',
              backgroundColor: '#EE7C45F2',
              href: '/',
            }}
          />
          <Story args={{ title: 'Luo oma profiili ja suunnittele polkusi', backgroundColor: '#CD4EB3F2', href: '/' }} />
        </div>
      </div>
    ),
  ],
};
