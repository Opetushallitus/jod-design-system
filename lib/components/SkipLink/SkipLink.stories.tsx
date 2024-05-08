import type { Meta, StoryObj } from '@storybook/react';

import { SkipLink } from './SkipLink';

const meta = {
  title: 'SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
} satisfies Meta<typeof SkipLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Skip link is only visible when getting focus.',
      },
    },
  },
  args: {
    label: 'Skip to main content',
    hash: '#',
  },
};
