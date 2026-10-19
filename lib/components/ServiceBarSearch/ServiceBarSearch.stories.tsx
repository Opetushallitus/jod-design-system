import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';

import type { TitledMeta } from '../../storybook';
import { getAccentBgClassForService, type ServiceVariant } from '../../utils';
import { ServiceBarSearch, type ServiceBarSearchProps } from './ServiceBarSearch';

const meta = {
  title: 'Navigation/ServiceBarSearch',
  component: ServiceBarSearch,
  tags: ['autodocs'],
  render: function Render(args) {
    const [expanded, setExpanded] = React.useState(args.expanded);
    return (
      <ServiceBarSearch
        {...args}
        expanded={expanded}
        onExpandedChange={(value) => {
          setExpanded(value);
          args.onExpandedChange(value);
        }}
      />
    );
  },
} satisfies TitledMeta<typeof ServiceBarSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

const serviceBarDecorator = (serviceVariant: ServiceVariant) =>
  function ServiceBarDecorator(Story: React.ComponentType) {
    return (
      <div
        className={`ds:flex ds:h-8 ds:items-center ds:justify-end ds:px-5 ${getAccentBgClassForService(serviceVariant)}`}
      >
        <Story />
      </div>
    );
  };

const baseProps: ServiceBarSearchProps = {
  expanded: false,
  onExpandedChange: fn(),
  onSubmit: fn(),
  placeholder: 'Hae palvelusta',
  ariaLabel: 'Hae palvelusta',
  searchLabel: 'Hae',
  testId: 'searchbar',
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Search for the service bar. On mobile it is collapsed into a toggle button until expanded.',
      },
    },
  },
  decorators: [serviceBarDecorator('yksilo')],
  args: baseProps,
};

export const Ohjaaja: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Search for the service bar on the ohjaaja service bar background.',
      },
    },
  },
  decorators: [serviceBarDecorator('ohjaaja')],
  args: baseProps,
};
