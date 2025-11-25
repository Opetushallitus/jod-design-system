import type { StoryObj } from '@storybook/react';
import { TitledMeta } from '../../utils';
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
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Chatbot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
