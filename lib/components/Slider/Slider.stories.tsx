import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { Slider } from './Slider';

const meta = {
  title: 'Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  const { value, onValueChange, ...rest } = args;
  const [numberValue, setNumberValue] = React.useState(value);

  React.useEffect(() => {
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
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6331',
  },
  backgrounds: {
    default: 'grey-bg',
    values: [{ name: 'grey-bg', value: '#F0F2F5' }],
  },
};

export const Default: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="ds-max-w-[348px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Osaamiset',
    onValueChange: fn(),
    value: 50,
  },
};

export const WithRightLabel: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="ds-max-w-[348px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Osaamiset',
    rightLabel: 'Kiinnostukset',
    onValueChange: fn(),
    value: 50,
  },
};
