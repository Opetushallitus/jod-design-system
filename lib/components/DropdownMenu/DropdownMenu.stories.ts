import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'Primitives/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose language',
    options: [
      { label: 'Suomi', value: 'fi' },
      { label: 'Svenska', value: 'sv' },
      { label: 'English', value: 'en' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Choose language',
    options: [
      { label: 'Suomi', value: 'fi' },
      { label: 'Svenska', value: 'sv' },
      { label: 'English', value: 'en' },
    ],
  },
};
