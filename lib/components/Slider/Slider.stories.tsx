import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';
import { fn } from '@storybook/test';

const meta = {
  title: 'Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  const { value, onValueChange, ...rest } = args;
  const [numberValue, setNumberValue] = useState(value);

  useEffect(() => {
    action('onValueChange')(args.value);
    setNumberValue(args.value);
  }, [args.value]);

  return (
    <Slider
      value={numberValue}
      onValueChange={(newValue) => {
        setNumberValue(newValue);
        onValueChange(newValue);
      }}
      {...rest}
    />
  );
};

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-7071',
  },
};

export const Default: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="max-w-[348px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Osaamiset',
    icon: 'school',
    onValueChange: fn(),
    value: 50,
  },
};
