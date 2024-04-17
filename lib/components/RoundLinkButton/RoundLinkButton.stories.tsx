import type { Meta, StoryObj } from '@storybook/react';

import { RoundLinkButton } from './RoundLinkButton';

const meta = {
  title: 'Buttons/RoundLinkButton',
  component: RoundLinkButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RoundLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: 'Goals',
    icon: 'target',
    component: ({ children, ...rootProps }) => (
      <a href="/#" {...rootProps}>
        {children}
      </a>
    ),
  },
};
