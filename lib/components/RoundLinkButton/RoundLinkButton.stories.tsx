import type { Meta, StoryObj } from '@storybook/react';

import { RoundLinkButton } from './RoundLinkButton';

const meta = {
  title: 'Primitives/RoundLinkButton',
  component: RoundLinkButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RoundLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: 'RoundLinkButton',
    component: ({ children, ...rootProps }) => (
      <a href="/#" {...rootProps}>
        {children}
      </a>
    ),
  },
};
