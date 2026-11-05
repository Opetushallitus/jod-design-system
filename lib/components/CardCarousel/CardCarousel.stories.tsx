import type { StoryObj } from '@storybook/react-vite';

import { JodFavorite } from '../../icons';
import type { TitledMeta } from '../../storybook';
import { MediaCard } from '../MediaCard/MediaCard';
import { CardCarousel } from './CardCarousel';

import './CardCarousel.stories.css';

const meta = {
  title: 'Cards/CardCarousel',
  component: CardCarousel,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof CardCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const design = {
  type: 'figma',
  url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=7031-3025&t=hppCWVuC76hePJaZ-4',
};

const Link = ({
  children,
  to,
  className,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: {
  children: React.ReactNode;
  to?: string;
  className?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}) => (
  <a href={to} className={className} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby}>
    {children}
  </a>
);

const decorators: Story['decorators'] = [
  (Story) => (
    <div className="ds:max-w-[1140px] ds:px-5">
      <Story />
    </div>
  ),
];

export const Default: Story = {
  decorators,
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
          imageSrc="https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260"
          imageAlt={`Image ${i + 1}`}
          to="#"
          linkComponent={Link}
          tags={[
            { label: 'Lorem', to: '#' },
            { label: 'Ipsum', to: '#' },
            { label: 'Dolor', to: '#' },
          ]}
        />
      ),
    })),
    itemWidth: 260,
    className: 'card-carousel-story',
    translations: {
      nextTrigger: 'Next page',
      prevTrigger: 'Previous page',
      indicator: (idx: number) => `Go to page ${idx + 1}`,
    },
  },
};

export const DifferentCardHeight: Story = {
  decorators,
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a carousel component for displaying MediaCards.',
      },
    },
  },
  args: {
    items: [
      {
        id: `card-1`,
        component: (
          <MediaCard
            label="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageSrc="https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260"
            imageAlt="Image 1"
            to="#"
            linkComponent={Link}
            tags={[
              { label: 'lorem', to: '#' },
              { label: 'ipsum', to: '#' },
              { label: 'dolor', to: '#' },
            ]}
          />
        ),
      },
      {
        id: `card-2`,
        component: (
          <MediaCard
            label="Lorem ipsum dolor sit amet"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            imageSrc="https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260"
            imageAlt="Image 2"
            to="#"
            linkComponent={Link}
            tags={[
              { label: 'lorem', to: '#' },
              { label: 'ipsum', to: '#' },
            ]}
          />
        ),
      },
      {
        id: `card-3`,
        component: (
          <MediaCard
            label="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            imageSrc="https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260"
            imageAlt="Image 3"
            to="#"
            linkComponent={Link}
            tags={[
              { label: 'lorem', to: '#' },
              { label: 'ipsum', to: '#' },
              { label: 'dolor', to: '#' },
              { label: 'sit', to: '#' },
              { label: 'amet', to: '#' },
            ]}
          />
        ),
      },
    ],
    itemWidth: 260,
    className: 'card-carousel-story',
    translations: {
      nextTrigger: 'Next page',
      prevTrigger: 'Previous page',
      indicator: (idx: number) => `Go to page ${idx + 1}`,
    },
  },
};

// The title is first in the DOM, so that a screen reader reads it first when the card is focused, but the favorite
// button is shown above it with `order-first`
const StretchCard = ({ index }: { index: number }) => (
  <div className="ds:flex ds:w-full ds:flex-col ds:gap-3 ds:rounded ds:bg-white ds:p-5 ds:shadow-border">
    <h3 className="ds:text-heading-3">Card {index}</h3>
    <div className="ds:order-first ds:flex ds:flex-row ds:items-center ds:justify-end">
      <button type="button" aria-label={`Add card ${index} to favorites`} className="ds:cursor-pointer ds:p-1">
        <JodFavorite size={24} />
      </button>
    </div>
    <p className="ds:font-arial ds:text-body-md">
      {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat((index % 3) + 1)}
    </p>
    <a href={`#card-${index}`} className="ds:text-accent ds:underline">
      Link {index}
    </a>
  </div>
);

export const Stretch: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 820, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'With `stretch` the cards grow to fill the whole width of the carousel. `itemWidth` is the minimum width of a card, so one card is shown on a narrow carousel and two or more on a wide one. The title of a card is first in the DOM, so that a screen reader reads it first, while the favorite button is shown above it.',
      },
    },
  },
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({ id: `card-${i + 1}`, component: <StretchCard index={i + 1} /> })),
    itemWidth: 340,
    stretch: true,
    className: 'card-carousel-story',
    translations: {
      nextTrigger: 'Next page',
      prevTrigger: 'Previous page',
      indicator: (idx: number) => `Go to page ${idx + 1}`,
    },
  },
};
