import type { Meta, StoryObj } from '@storybook/react';

import { TextCard } from './TextCard';

const meta = {
  title: 'Primitives/Cards/TextCard',
  component: TextCard,
  tags: ['autodocs'],
} satisfies Meta<typeof TextCard>;

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
        story: 'This is a card component for displaying a text with a label.',
      },
    },
  },
  args: {
    text: 734,
    label: 'ammatteja',
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
        story: 'This is a card component for displaying a longer text with a label.',
      },
    },
  },
  args: {
    text: 2336,
    label: 'koulutuksia',
  },
};
