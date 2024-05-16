import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { useState, useEffect } from 'react';

import { Checkbox, CheckboxProps } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-7171',
};
const label = 'Tuloksen sopivuus';
const render = (args: CheckboxProps) => {
  const [, setArgs] = useArgs();
  const [value, setValue] = useState<boolean>(args.checked);

  useEffect(() => {
    action('onChange')(args.checked);
    setValue(args.checked);
  }, [args.checked]);

  const onChange = (value: boolean) => {
    action('onChange')(value);
    setArgs({ checked: value });
    setValue(value);
  };

  return <Checkbox {...args} checked={value} onChange={() => onChange(!value)} />;
};

export const Available: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a available checkbox.',
      },
    },
  },
  args: {
    name: 'name',
    disabled: false,
    value: 'value',
    checked: false,
    label,
  },
  render,
};

export const Selected: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a selected checkbox.',
      },
    },
  },
  args: {
    name: 'name',
    disabled: false,
    value: 'value',
    checked: true,
    label,
  },
  render,
};

export const Disabled: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a disabled checkbox.',
      },
    },
  },
  args: {
    name: 'name',
    disabled: true,
    value: 'value',
    checked: false,
    label,
  },
  render,
};
