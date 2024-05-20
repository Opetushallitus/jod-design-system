import type { Meta, StoryObj } from '@storybook/react';

import { ActiveIndicator } from './ActiveIndicator';

const meta = {
  title: 'ActiveIndicator',
  component: ActiveIndicator,
  tags: ['autodocs'],
} satisfies Meta<typeof ActiveIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ul className="text-button-md">
      <li className="flex items-center">
        <ActiveIndicator /> Item 1
      </li>
      <li className="flex items-center">Item 2</li>
      <li className="flex items-center">Item 3</li>
    </ul>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple indicator for an active list item',
      },
    },
  },
};
