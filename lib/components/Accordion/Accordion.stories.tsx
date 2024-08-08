import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

const meta = {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

// Decorator for preventing the preview size change when the content is toggled
const decorators: Story['decorators'] = [
  (Story) => (
    <div className="min-h-[80px]">
      <Story />
    </div>
  ),
];

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6882',
  },
};

export const Default: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion component for hiding content.',
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

export const TitleComponent: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion component with a custom component as a title.',
      },
    },
  },
  args: {
    title: <div className="text-heading-1 font-arial text-alert italic tracking-widest">Title</div>,
    children: 'Content',
    lang: 'en',
    expandMoreText: 'Show more',
    expandLessText: 'Show less',
  },
};

export const WithUnderline: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion component with underlined title.',
      },
    },
  },
  args: {
    title: 'Title',
    children: 'Content',
    underline: true,
    lang: 'en',
    expandMoreText: 'Show more',
    expandLessText: 'Show less',
  },
};
