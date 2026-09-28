import type { StoryObj } from '@storybook/react-vite';

import type { TitledMeta } from '../../storybook';
import { Picture } from './Picture';

const meta = {
  title: 'Images/Picture',
  component: Picture,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Picture>;

export default meta;

type Story = StoryObj<typeof meta>;

const src = 'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80';

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Renders an image available in several formats and widths as `<picture>` with a `<source>` per format.',
      },
    },
  },
  args: {
    picture: {
      sources: [
        { srcSet: `${src}&fm=avif&w=260 260w, ${src}&fm=avif&w=520 520w`, type: 'image/avif' },
        { srcSet: `${src}&fm=webp&w=260 260w, ${src}&fm=webp&w=520 520w`, type: 'image/webp' },
      ],
      img: { src: `${src}&fm=jpg&w=520`, w: 520, h: 780 },
    },
    alt: 'Woman standing in front of a colourful wall',
    sizes: '260px',
    className: 'ds:w-[260px] ds:h-auto',
  },
};
