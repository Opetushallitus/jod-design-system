import type { Meta, StoryObj } from '@storybook/react';

import { FigureCard } from './FigureCard';

const meta = {
  title: 'Primitives/Cards/FigureCard',
  component: FigureCard,
  tags: ['autodocs'],
} satisfies Meta<typeof FigureCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LP7Acqn5dNNHS0R1YUWM1n/cx_jod_sb?node-id=1-1059',
    },
    docs: {
      description: {
        story: 'This is a card component for displaying a text figure with a caption.',
      },
    },
  },
  args: {
    content: 734,
    caption: 'ammatteja',
  },
};

export const Longer: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LP7Acqn5dNNHS0R1YUWM1n/cx_jod_sb?node-id=1%3A1062',
    },
    docs: {
      description: {
        story: 'This is a card component for displaying a longer text figure with a caption.',
      },
    },
  },
  args: {
    content: 2336,
    caption: 'koulutuksia',
  },
};
