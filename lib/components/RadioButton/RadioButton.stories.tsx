import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { RadioButton } from './RadioButton';
import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup';

const meta = {
  title: 'Form/RadioButton',
  component: RadioButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=746-43288',
  },
};

const DefaultStoryRender = (props: RadioButtonGroupProps) => {
  const [value, setValue] = React.useState<string>('a');
  return <RadioButtonGroup {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  parameters: {
    ...parameters,
  },
  args: {
    label: 'Valitse, miten haluat ryhmitellä osaamisesi.',
    value: 'a',
    onChange: fn(),
    children: (
      <>
        <RadioButton label="Lähteiden mukaan" value="a" />
        <RadioButton label="Teemoittain" value="b" />
        <RadioButton label="Aakkosellisesti" value="c" />
      </>
    ),
  },
  render: (args) => {
    return <DefaultStoryRender {...args} />;
  },
};

export const Bordered: Story = {
  parameters: {
    ...parameters,
    backgrounds: {
      default: 'jod-bg-white',
      values: [{ name: 'jod-bg-white', value: '#fff' }],
    },
  },
  args: {
    label: 'Valitse, miten haluat ryhmitellä osaamisesi.',
    value: 'a',
    onChange: fn(),
    children: (
      <>
        <RadioButton label="Lähteiden mukaan" value="a" variant="bordered" />
        <RadioButton label="Teemoittain" value="b" variant="bordered" />
        <RadioButton label="Aakkosellisesti" value="c" variant="bordered" />
      </>
    ),
  },
  render: (args) => {
    return <DefaultStoryRender {...args} />;
  },
};
