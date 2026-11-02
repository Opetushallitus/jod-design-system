import type { StoryObj } from '@storybook/react-vite';

import type { TitledMeta } from '../../storybook';
import { Carousel } from './Carousel';

const meta = {
  title: 'Content/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const translations = {
  nextTrigger: 'Next page',
  prevTrigger: 'Previous page',
  indicator: (idx: number) => `Go to page ${idx + 1}`,
};

const Card = ({ index }: { index: number }) => (
  <div className="ds:flex ds:w-full ds:flex-col ds:gap-3 ds:rounded ds:bg-white ds:p-5 ds:shadow-border">
    <h3 className="ds:text-heading-3">Card {index}</h3>
    <p className="ds:font-arial ds:text-body-md">
      {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat((index % 3) + 1)}
    </p>
    <a href={`#card-${index}`} className="ds:text-accent ds:underline">
      Link {index}
    </a>
  </div>
);

const createItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({ id: `item-${i + 1}`, component: <Card index={i + 1} /> }));

// The story files are not scanned for the CSS classes, so the layout of the decorator uses inline styles
const decorators = [
  (Story: React.ComponentType) => (
    <div style={{ maxWidth: 820, padding: 16 }}>
      <Story />
    </div>
  ),
];

export const Default: Story = {
  decorators,
  parameters: {
    docs: {
      description: {
        story:
          'The items have a fixed width. As many items are shown at a time as fit in the width of the carousel, and the items are changed page by page.',
      },
    },
  },
  args: {
    items: createItems(10),
    itemWidth: 260,
    translations,
  },
};

export const Stretch: Story = {
  decorators,
  parameters: {
    docs: {
      description: {
        story:
          'With `stretch` the items grow to fill the whole width of the carousel. `itemWidth` is the minimum width of an item, so one item is shown on a narrow carousel and two or more on a wide one.',
      },
    },
  },
  args: {
    items: createItems(10),
    itemWidth: 340,
    stretch: true,
    translations,
  },
};

export const SinglePage: Story = {
  decorators,
  parameters: {
    docs: {
      description: {
        story:
          'When all the items fit on one page, there is only one page indicator and the pager buttons are disabled.',
      },
    },
  },
  args: {
    items: createItems(2),
    itemWidth: 340,
    stretch: true,
    translations,
  },
};
