import type { StoryObj } from '@storybook/react';

import { TitledMeta } from '../../storybook';
import { Chatbot } from './Chatbot';

const meta = {
  title: 'Misc/Chatbot',
  component: Chatbot,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  // !test: Renders nothing and loads the chatbot from an external host, so automated tests (e2e/a11y.spec.ts) skip it.
  tags: ['autodocs', '!test'],
} satisfies TitledMeta<typeof Chatbot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: 'Neuvontabotti',
  },
};
