import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import { action } from 'storybook/actions';
import { useState } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { Slider } from './Slider';

const meta = {
  title: 'Misc/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const Render = (args: Story['args']) => {
  const { value, onValueChange, ...rest } = args;
  const [numberValue, setNumberValue] = useState(value);

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
  render: Render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[414px]">
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
  render: Render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[348px]">
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

export const Disabled: Story = {
  render: Render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[348px]">
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
    disabled: true,
  },
};
