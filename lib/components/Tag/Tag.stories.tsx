import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import { Tag } from './Tag';

const meta = {
  title: 'Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selectable: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-6833',
    },
  },
  args: {
    label: 'selectable',
    onClick: fn(),
  },
};

export const Added: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-6866',
    },
  },
  args: {
    label: 'added',
    onClick: fn(),
    variant: 'added',
  },
};
