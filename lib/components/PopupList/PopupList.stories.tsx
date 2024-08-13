import type { Meta, StoryObj } from '@storybook/react';

import { PopupList, PopupListItem } from './PopupList';

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
        story: 'Default popup list behavior with links.',
      },
    },
  },
  args: {
    children: (
      <>
        <PopupListItem>
          <a href="/#">Omat sivut</a>
        </PopupListItem>
        <PopupListItem>
          <button onClick={console.log}>Kirjaudu ulos</button>
        </PopupListItem>
      </>
    ),
  },
};
