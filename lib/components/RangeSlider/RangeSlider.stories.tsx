import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import { action } from 'storybook/internal/actions';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { RangeSlider } from './RangeSlider';

const meta = {
  title: 'Misc/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  globals: {
    backgrounds: { value: 'gray' },
  },
} satisfies TitledMeta<typeof RangeSlider>;

export default meta;

type Story = StoryObj<typeof meta>;
const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=15169-173968',
  },
  docs: {
    description: {
      story: 'Range slider component for selecting a values within a range.',
    },
  },
};

const baseProps = {
  minValueDescription: 'Minimum duration',
  maxValueDescription: 'Maximum duration',
  markers: [
    { value: 0, label: '1 pvä' },
    { value: 1, label: '1 vko' },
    { value: 2, label: '1 kk' },
    { value: 3, label: '1 v' },
    { value: 4, label: '3 v' },
    { value: 5, label: '6+ v' },
  ],
  onValueChange: fn(),
};

export const Default: Story = {
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
    ...baseProps,
  },
};

export const Controlled: Story = {
  render: (args: Story['args']) => {
    const { value, onValueChange, ...rest } = args;
    const [stateValue, setStateValue] = React.useState(value);

    React.useEffect(() => {
      action('onValueChange')(args.value);
      setStateValue(args.value);
    }, [args.value]);

    return (
      <>
        <RangeSlider
          value={stateValue}
          onValueChange={(newValue) => {
            setStateValue(newValue);
            onValueChange(newValue);
          }}
          {...rest}
        />
        <pre className="ds:mt-6">{`Value is ${JSON.stringify(stateValue)}`}</pre>
      </>
    );
  },
  decorators: [
    (Story) => (
      <div className="ds:max-w-[414px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Controlled mode, the value comes from outside the component.',
      },
    },
  },
  args: {
    ...baseProps,
    value: [1, 3],
  },
};
