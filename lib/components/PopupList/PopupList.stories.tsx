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
        story: 'Popup list is a list of buttons or links that can be used for actions in a popup menu.',
      },
    },
  },
  args: {
    items: [
      { label: 'Omat sivut', onClick: fn() },
      { label: 'Kirjaudu ulos', onClick: fn() },
    ],
  },
};

export const Actives: Story = {
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

export const Links: Story = {
  render: (args) => <PopupList items={args.items} itemsType="link" />,
  parameters: {
    docs: {
      description: {
        story: 'Popup list with links instead of buttons',
      },
    },
  },
  args: {
    items: [
      { label: 'Luo tili', href: '#' },
      { label: 'Kirjaudu sisään', href: '#' },
    ],
    itemsType: 'link',
  },
};
