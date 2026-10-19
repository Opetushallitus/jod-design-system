import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';

import type { TitledMeta } from '../../storybook';
import { SearchBar, type SearchBarProps } from './SearchBar';

const meta = {
  title: 'Forms/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  render: function Render(args) {
    const [value, setValue] = React.useState(args.value);
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange(newValue);
        }}
      />
    );
  },
} satisfies TitledMeta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseProps: SearchBarProps = {
  value: '',
  onChange: fn(),
  onSubmit: fn(),
  placeholder: 'Hae sivustolta',
  searchLabel: 'Hae',
  clearLabel: 'Tyhjennä haku',
  serviceVariant: 'yksilo',
  testId: 'searchbar',
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is a search bar with default styling.',
      },
    },
  },
  args: baseProps,
};

export const Ohjaaja: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is a search bar with the ohjaaja service variant.',
      },
    },
  },
  args: {
    ...baseProps,
    serviceVariant: 'ohjaaja',
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is a search bar with an error message.',
      },
    },
  },
  args: {
    ...baseProps,
    value: 'ab',
    errorMessage: 'Hakusanan tulee olla vähintään 3 merkkiä pitkä',
  },
};
