import type { Meta, StoryObj } from '@storybook/react';

import { ResultsCard } from './ResultsCard';

const meta = {
  title: 'Cards/ResultsCard',
  component: ResultsCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ResultsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=585%3A15053',
    },
    docs: {
      description: {
        story: 'This is a card component for displaying a text with a label.',
      },
    },
  },
  args: {
    value: 534,
    label: 'ammatteja',
  },
};

export const Longer: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=585%3A15053',
    },
    docs: {
      description: {
        story: 'This is a card component for displaying a longer text with a label.',
      },
    },
  },
  args: {
    value: 2336,
    label: 'koulutuksia',
  },
};
