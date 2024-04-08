import type { Meta, StoryObj } from '@storybook/react';

import { Expander } from './Expander';

const meta = {
  title: 'Primitives/Expander',
  component: Expander,
  tags: ['autodocs'],
} satisfies Meta<typeof Expander>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A7857',
  },
};

export const Default: Story = {
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Label',
    description: 'Description',
    children: <div>Children here</div>,
  },
};
