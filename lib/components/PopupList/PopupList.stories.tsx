import type { Meta, StoryObj } from '@storybook/react';

import { PopupList } from './PopupList';
import { fn } from '@storybook/test';

const meta = {
  title: 'PopupList',
  component: PopupList,
  tags: ['autodocs'],
} satisfies Meta<typeof PopupList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default popup list behavior with links',
      },
    },
  },
  args: {
    items: [
      { label: 'Omat sivut', href: '#' },
      { label: 'Kirjaudu ulos', href: '#' },
    ],
  },
};

export const Active: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popup list with active indicator',
      },
    },
  },
  args: {
    items: [{ label: 'Suomeksi' }, { label: 'På svenska' }, { label: 'In English', active: true }],
  },
};

export const ButtonsAndLinks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popup list with links and buttons',
      },
    },
  },
  args: {
    items: [
      { label: 'Luo tili', type: 'link', href: '#' },
      { label: 'Kirjaudu sisään', type: 'button', onClick: fn() },
    ],
  },
};
