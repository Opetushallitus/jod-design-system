import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: 'Base Button',
    variant: 'base',
    onClick: fn(),
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    onClick: fn(),
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
    onClick: fn(),
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
    onClick: fn(),
  },
};
