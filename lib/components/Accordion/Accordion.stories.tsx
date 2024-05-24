import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

const meta = {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=541-11408',
    },
    docs: {
      description: {
        story: 'This is XYZ',
      },
    },
  },
  args: {
    title: 'Title',
    children: 'Content',
    lang: 'en',
    expandMoreText: 'Show more',
    expandLessText: 'Show less',
  },
};
