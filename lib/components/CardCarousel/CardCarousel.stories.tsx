import type { Meta, StoryObj } from '@storybook/react';
import { MediaCard } from '../MediaCard/MediaCard';
import { CardCarousel } from './CardCarousel';

const meta = {
  title: 'CardCarousel',
  component: CardCarousel,
  tags: ['autodocs'],
} satisfies Meta<typeof CardCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const design = {
  type: 'figma',
  url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=7031-3025&t=hppCWVuC76hePJaZ-4',
};
export const Default: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a carousel component for displaying MediaCards.',
      },
    },
  },
  args: {
    items: Array.from({ length: 15 }, (_, i) => ({
      id: `card-${i + 1}`,
      component: (
        <MediaCard
          label={`Card ${i + 1}`}
          description={`Description ${i + 1}`}
          imageSrc="https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260?q=80&w=260"
          imageAlt={`Image ${i + 1}`}
          tags={['Lorem', 'Ipsum', 'Dolor']}
        />
      ),
    })),
    itemWidth: 260,
    translations: {
      nextPage: 'Go to next page',
      previousPage: 'Go to previous page',
      goToPage: 'Go to page number',
    },
  },
};
