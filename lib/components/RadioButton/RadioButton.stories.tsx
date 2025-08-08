import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';

import { RadioButton } from './RadioButton';
import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup';

const meta = {
  title: 'Forms/RadioButton',
  component: RadioButtonGroup,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof RadioButtonGroup>;

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
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    label: 'Valitse, miten haluat ryhmitellä osaamisesi.',
    value: 'a',
    onChange: fn(),
    children: (
      <>
        <RadioButton label="Lähteiden mukaan" value="a" />
        <RadioButton label="Teemoittain" value="b" />
        <RadioButton label="Aakkosellisesti" value="c" disabled={true} />
      </>
    ),
  },
  render: DefaultStoryRender,
};

export const WithOneDisabled: Story = {
  parameters: {
    ...parameters,
    backgrounds: {
      default: 'jod-bg-white',
      values: [{ name: 'jod-bg-white', value: '#fff' }],
    },
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    label: 'Valitse, miten haluat ryhmitellä osaamisesi.',
    value: 'a',
    onChange: fn(),
    children: (
      <>
        <RadioButton label="Lähteiden mukaan" value="a" />
        <RadioButton label="Teemoittain" value="b" />
        <RadioButton label="Aakkosellisesti" value="c" disabled />
      </>
    ),
  },
  render: DefaultStoryRender,
};
