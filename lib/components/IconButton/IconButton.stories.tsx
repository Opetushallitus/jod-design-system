import type { StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { JodEdit } from '../../icons';
import type { TitledMeta } from '../../utils';
import { IconButton, type IconButtonProps } from './IconButton';

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14026-23508',
    },
  },
  argTypes: {
    // Icon prop needs to be hidden, otherwise Storybook documentation breaks due to a serialization error
    icon: { table: { disable: true }, control: false },
  },
} satisfies TitledMeta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseProps: IconButtonProps = {
  onClick: fn(),
  icon: <JodEdit />,
  ariaLabel: 'Edit',
  variant: 'gray',
  indicative: false,
  disabled: false,
  selected: false,
  serviceVariant: 'yksilo',
  testId: 'icon-button',
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is an icon button with default styling.',
      },
    },
  },
  args: baseProps,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is an icon button in disabled state.',
      },
    },
  },
  args: {
    ...baseProps,
    disabled: true,
  },
};

export const Indicative: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is an icon button in indicative state (non-interactive). Renders as a span element.',
      },
    },
  },
  args: {
    ...baseProps,
    indicative: true,
    onClick: undefined,
  },
};
