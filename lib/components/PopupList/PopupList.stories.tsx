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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7341&t=5Uc1JYa0GCm43PGV-4',
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
