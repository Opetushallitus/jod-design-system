import type { Meta, StoryObj } from '@storybook/react';

import { ContentCard } from './ContentCard';

const meta = {
  title: 'Cards/ContentCard',
  component: ContentCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ContentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8588',
    },
    docs: {
      description: {
        story: 'This is a simple content card component for "ohjaaja" UI.',
      },
    },
  },
  args: {
    title: 'Tulevaisuusmatka',
    description:
      'Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet, lorem velit osana ei osaa sanoa mitä accumsan dolor nonummy.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag'],
    className: 'ds:bg-white',
  },
};
