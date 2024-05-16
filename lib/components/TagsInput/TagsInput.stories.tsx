import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TagsInput } from './TagsInput';

const meta = {
  title: 'TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TagsInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-7646',
  },
};

export const Top: Story = {
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Label text',
    placeholder: 'Lorem ipsum dolor sit amet',
    tags: ['dog', 'cat', 'fish', 'bird'],
    onValueChange: fn(),
  },
};

export const Bottom: Story = {
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Label text',
    placeholder: 'Lorem ipsum dolor sit amet',
    tags: ['dog', 'cat', 'fish', 'bird'],
    onValueChange: fn(),
    inputPosition: 'bottom',
  },
};
