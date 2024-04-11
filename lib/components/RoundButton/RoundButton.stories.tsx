import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RoundButton } from './RoundButton';

const meta = {
  title: 'Primitives/RoundButton',
  component: RoundButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RoundButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: 'Goals',
    onClick: fn(),
    icon: 'target',
  },
};
