import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './Toast';

const meta = {
  title: 'Snackbars/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8376',
    },
    docs: {
      description: {
        story: 'This is a toast component for displaying a text.',
      },
    },
  },
  args: {
    text: 'Lorem ipsum dolor',
    icon: 'check_circle',
    iconAriaLabel: 'Check Circle',
  },
};

export const Iconless: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8376',
    },
    docs: {
      description: {
        story: 'This is a toast component for displaying a text without an icon.',
      },
    },
  },
  args: {
    text: 'Lorem ipsum dolor',
  },
};
