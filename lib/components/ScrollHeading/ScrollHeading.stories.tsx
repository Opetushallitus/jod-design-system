import type { StoryObj } from '@storybook/react-vite';

import type { TitledMeta } from '../../utils';
import { NoteStackProvider } from '../NavigationBar';
import { ScrollHeading } from './ScrollHeading';
const meta = {
  title: 'Content/ScrollHeading',
  component: ScrollHeading,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NoteStackProvider>
        <Story />
      </NoteStackProvider>
    ),
  ],
} satisfies TitledMeta<typeof ScrollHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

// Not as a component in Figma

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Component to scroll into',
      },
    },
  },
  args: {
    title: 'Kesto',
    heading: 'h2',
    className: 'ds:text-heading-2',
  },
};
