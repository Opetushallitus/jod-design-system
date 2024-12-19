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
/* const backgrounds = {
  default: 'jod-bg-white',
  values: [{ name: 'jod-bg-white', value: '#fff' }],
}; */

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
    items: Array.from({ length: 25 }, (_, i) => (
      <MediaCard
        label={`Card ${i + 1}`}
        description={`Description ${i + 1}`}
        imageSrc="https://tinyurl.com/5b6ka8jd"
        imageAlt={`Image ${i + 1}`}
        tags={['Lorem', 'Ipsum', 'Dolor']}
      />
    )),
  },
};
