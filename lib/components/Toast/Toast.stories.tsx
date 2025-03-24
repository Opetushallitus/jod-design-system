import type { Meta, StoryObj } from '@storybook/react';

import { MdCheck, MdDangerous, MdWarning } from 'react-icons/md';
import { Toast } from './Toast';

const meta = {
  title: 'Snackbar/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const url = 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8824';
const text = 'Lorem ipsum dolor';

export const Success: Story = {
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a success toast component for displaying a text.',
      },
    },
  },
  args: {
    text,
    icon: <MdCheck size={24} />,
  },
};

export const Warning: Story = {
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a warning toast component for displaying a text.',
      },
    },
  },
  args: {
    text,
    icon: <MdWarning size={24} />,
    variant: 'warning',
  },
};

export const ErrorStory: Story = {
  name: 'Error',
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is an error toast component for displaying a text.',
      },
    },
  },
  args: {
    text,
    icon: <MdDangerous size={24} />,
    variant: 'error',
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
