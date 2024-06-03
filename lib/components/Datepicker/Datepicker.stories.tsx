import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Datepicker } from './Datepicker';

const meta = {
  title: 'Forms/Datepicker',
  component: Datepicker,
  tags: ['autodocs'],
} satisfies Meta<typeof Datepicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/todo',
  },
};

const args = {
  label: 'Valitse päivämäärä',
  placeholder: 'pp.kk.vvvv',
  help: 'Help text',
  onChange: fn(),
};

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters,
  args,
};

export const WithValue: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters,
  args: {
    ...args,
    value: '2024-06-01',
  },
};
