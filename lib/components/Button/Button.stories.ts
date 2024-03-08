import type { Meta, StoryObj } from '@storybook/react';

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
    onClick: () => {
      // Do nothing
    },
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    onClick: () => {
      // Do nothing
    },
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    variant: 'outlined',
    onClick: () => {
      // Do nothing
    },
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
    onClick: () => {
      // Do nothing
    },
  },
};
