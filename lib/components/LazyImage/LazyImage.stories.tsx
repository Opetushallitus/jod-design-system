import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';
import { LazyImage } from './LazyImage';

const meta = {
  title: 'Images/LazyImage',
  component: LazyImage,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof LazyImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is a lazy loading image component that preloads the image before displaying it.',
      },
    },
  },
  args: {
    src: 'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260',
    alt: 'Woman standing in front of a colourful wall',
  },
};
