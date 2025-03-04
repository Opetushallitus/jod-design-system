import { action } from '@storybook/addon-actions';
import { useArgs, useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxProps } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;
const backgrounds = {
  default: 'jod-bg-white',
  values: [
    { name: 'jod-bg-white', value: '#fff' },
    { name: 'jod-bg-1', value: '#f0f2f5' },
    { name: 'jod-bg-2', value: '#e4e6ec' },
  ],
};

const design = {
  type: 'figma',
  url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-7171',
};
const label = 'Tuloksen sopivuus';
const render = (args: CheckboxProps) => {
  const [, setArgs] = useArgs();
  const [value, setValue] = useState<boolean>(args.checked);

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
    ariaLabel: label,
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
    ariaLabel: label,
  },
  render,
};

export const Bordered: Story = {
  parameters: {
    backgrounds,
    design,
    docs: {
      description: {
        story: 'This is a checkbox with bordered variant.',
      },
    },
  },
  args: {
    name: 'name',
    value: 'value',
    checked: false,
    label,
    ariaLabel: label,
    variant: 'bordered',
  },
  render,
};
export const BorderedAndDisabled: Story = {
  parameters: {
    backgrounds,
    design,
    docs: {
      description: {
        story: 'This is a disabled checkbox with bordered variant.',
      },
    },
  },
  args: {
    name: 'name',
    disabled: true,
    value: 'value',
    checked: false,
    label,
    ariaLabel: label,
    variant: 'bordered',
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
    ariaLabel: label,
  },
  render,
};

export const WithNoVisibleLabel: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a checkbox which has no visible label (having aria-label).',
      },
    },
  },
  args: {
    name: 'name',
    value: 'value',
    checked: false,
    variant: 'bordered',
    ariaLabel: label,
  },
  render,
};

export const DisabledAndBorderedWithNoVisibleLabel: Story = {
  parameters: {
    backgrounds,
    design,
    docs: {
      description: {
        story: 'This is a disabled checkbox with bordered variant, which has no visible label (having aria-label).',
      },
    },
  },
  args: {
    name: 'name',
    disabled: true,
    value: 'value',
    checked: false,
    ariaLabel: label,
    variant: 'bordered',
  },
  render,
};

export const ComponentAsLabel: Story = {
  parameters: {
    backgrounds,
    design,
    docs: {
      description: {
        story: 'This is a disabled checkbox with bordered variant, which has no visible label (having aria-label).',
      },
    },
  },
  args: {
    name: 'name',
    value: 'value',
    checked: false,
    label: (
      <div className="ds:flex ds:flex-row ds:ml-2 ds:gap-3">
        <span className="ds:text-heading-2 ds:ml-3">{label}</span>
        <span className="ds:size-3 ds:rounded ds:bg-success ds:block ds:self-center" />
      </div>
    ),
    ariaLabel: label,
    variant: 'bordered',
  },
  render,
};
