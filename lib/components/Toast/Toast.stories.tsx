import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { JodLoading } from '../../icons';
import { Toast } from './Toast';

const meta = {
  title: 'Popups/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const text = 'Lorem ipsum dolor';

export const Success: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69766',
    },
    docs: {
      description: {
        story: 'This is a success toast component for displaying a text.',
      },
    },
  },
  args: {
    text,
  },
};

export const Warning: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69787',
    },
    docs: {
      description: {
        story: 'This is a warning toast component for displaying a text.',
      },
    },
  },
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    variant: 'warning',
  },
};

export const ErrorStory: Story = {
  name: 'Error',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69801',
    },
    docs: {
      description: {
        story: 'This is an error toast component for displaying a text.',
      },
    },
  },
  args: {
    text,
    variant: 'error',
  },
};
export const Neutral: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69753',
    },
    docs: {
      description: {
        story: 'This is an neutral toast component for displaying a text.',
      },
    },
  },
  args: {
    text,
    variant: 'neutral',
  },
};

export const CustomIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69753',
    },
    docs: {
      description: {
        story: 'This is an toast component with a custom icon.',
      },
    },
  },
  args: {
    text,
    icon: <JodLoading className="ds:text-accent ds:animate-spin" />,
    variant: 'success',
  },
};

export const LongText: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69973',
    },
    docs: {
      description: {
        story: 'This is a toast with a long text. It should wrap correctly and not overflow the container.',
      },
    },
  },
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};
