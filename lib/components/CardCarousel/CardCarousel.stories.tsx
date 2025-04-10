import type { Meta, StoryObj } from '@storybook/react';
import { MediaCard } from '../MediaCard/MediaCard';
import { CardCarousel } from './CardCarousel';

const meta = {
  title: 'Cards/CardCarousel',
  component: CardCarousel,
  tags: ['autodocs'],
} satisfies Meta<typeof CardCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const design = {
  type: 'figma',
  url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=7031-3025&t=hppCWVuC76hePJaZ-4',
};

const Link = ({ children, to, className }: { children: React.ReactNode; to?: string | object; className?: string }) => (
  <a href={typeof to === 'string' ? to : '#'} className={className}>
    {children}
  </a>
);

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="ds:max-w-[1140px] ds:px-5">
        <Story />
      </div>
    ),
  ],
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
    translations: {
      nextTrigger: 'Next page',
      prevTrigger: 'Previous page',
      indicator: (idx: number) => `Go to page ${idx + 1}`,
    },
    className: 'ds:p-7 ds:-m-7',
  },
};

export const DifferentCardHeight: Story = {
  decorators: [
    (Story) => (
      <div className="ds:max-w-[1140px] ds:px-5">
        <Story />
      </div>
    ),
  ],
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
    translations: {
      nextTrigger: 'Next page',
      prevTrigger: 'Previous page',
      indicator: (idx: number) => `Go to page ${idx + 1}`,
    },
    className: 'ds:p-7 ds:-m-7',
  },
};
