import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { Toggle } from './Toggle';

const meta = {
  title: 'Forms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked);
    React.useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);
    return <Toggle {...args} checked={checked} onChange={() => setChecked(!checked)} />;
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/a3heEFNpoI9MRcMFtbYVfO/Osaamispolku---Design-system?node-id=459-2024&t=ZhYQBTprMjaC7Bhl-0',
    },
    docs: {
      description: {
        story: 'Toggle component for toggling between two states.',
      },
    },
  },
  argTypes: {
    variant: {
      options: ['YKSILO', 'OHJAAJA', 'TIETOPALVELU'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    onChange: fn(),
    checked: true,
    ariaLabel: 'Toggle',
    variant: 'yksilo',
    disabled: false,
  },
};

export const Disabled: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/a3heEFNpoI9MRcMFtbYVfO/Osaamispolku---Design-system?node-id=459-2024&t=ZhYQBTprMjaC7Bhl-0',
    },
    docs: {
      description: {
        story: 'Toggle component in disabled state.',
      },
    },
  },
  args: {
    onChange: fn(),
    disabled: true,
    checked: true,
    ariaLabel: 'Toggle',
    variant: 'yksilo',
  },
};
