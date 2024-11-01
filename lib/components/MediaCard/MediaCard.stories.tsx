import type { Meta, StoryObj } from '@storybook/react';

import { MediaCard } from './MediaCard';

const meta = {
  title: 'Cards/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
} satisfies Meta<typeof MediaCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8529',
    },
  },
  args: {
    variant: 'vertical',
    imageSrc: 'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260?q=80&w=260',
    imageAlt: 'Woman standing in front of a colourful wall',
    label: 'Tulevaisuusmatka',
    description: 'Tulevaisuusmatka on koulutus, joka auttaa sinua löytämään oman polkusi ja tavoitteesi.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag'],
  },
};

export const Horizontal: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8529',
    },
  },
  args: {
    variant: 'horizontal',
    imageSrc: 'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260',
    imageAlt: 'Woman standing in front of a colourful wall',
    label: 'Tulevaisuusmatka',
    description: 'Tulevaisuusmatka on koulutus, joka auttaa sinua löytämään oman polkusi ja tavoitteesi.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag'],
  },
};
