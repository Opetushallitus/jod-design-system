import type { Meta, StoryObj } from '@storybook/react';
import { Datepicker } from './Datepicker';
import { useState } from 'react';

const meta = {
  title: 'Forms/Datepicker',
  component: Datepicker,
  tags: ['autodocs'],
} satisfies Meta<typeof Datepicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/todo',
  },
};

const args = {
  label: 'Valitse päivämäärä',
  placeholder: 'pp.kk.vvvv',
};

export const Default: Story = {
  render: (args) => {
    const [dateValue, setDateValue] = useState('');
    return (
      <Datepicker
        {...args}
        onValueChange={(value) => {
          const data = value.value[0];

          if (data) {
            const day = `${data.day}`.padStart(2, '0');
            const month = `${data.month}`.padStart(2, '0');
            const year = `${data.year}`;
            setDateValue(`${day}.${month}.${year}`);
            console.log(dateValue);
          }
        }}
      />
    );
  },
  parameters,
  args,
};

export const WithValue: Story = {
  parameters,
  args: {
    ...args,
    value: ['2024-06-01'],
  },
};
