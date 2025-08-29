import type { StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';

import { JodArrowLeft, JodUser } from '../../icons';
import { Button } from './Button';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Button component for user actions.',
      },
    },
    controls: {
      exclude: ['ref', 'className', 'LinkComponent', 'form', 'icon'],
    },
  },
  argTypes: {
    serviceVariant: {
      control: { type: 'radio' },
      options: ['yksilo', 'ohjaaja', 'tietopalvelu', 'palveluportaali'],
    },
  },
} satisfies TitledMeta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const design = {
  type: 'figma',
  url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=13745-13872&t=m7CDBHDimiM0Mjn3-4',
};

export const AllVariants: Story = {
  render: (args) => {
    const smButtons = [
      {
        label: 'Default (accent)',
        cmp: <Button {...args} variant="accent" size="sm" />,
        cmpDisabled: <Button {...args} variant="accent" size="sm" disabled />,
      },
      {
        label: 'White (secondary)',
        cmp: <Button {...args} variant="white" size="sm" />,
        cmpDisabled: <Button {...args} variant="white" size="sm" disabled />,
      },
      {
        label: 'Plain (tertiary)',
        cmp: <Button {...args} variant="plain" size="sm" />,
        cmpDisabled: <Button {...args} variant="plain" size="sm" disabled />,
      },
      {
        label: 'Red Delete (danger primary)',
        cmp: <Button {...args} variant="red-delete" size="sm" />,
        cmpDisabled: <Button {...args} variant="red-delete" size="sm" disabled />,
      },
      {
        label: 'White Delete (danger secondary)',
        cmp: <Button {...args} variant="white-delete" size="sm" />,
        cmpDisabled: <Button {...args} variant="white-delete" size="sm" disabled />,
      },
      {
        label: 'Gray',
        cmp: <Button {...args} variant="gray" size="sm" />,
        cmpDisabled: <Button {...args} variant="gray" size="sm" disabled />,
      },
    ];

    const lgButtons = [
      {
        label: 'Default (accent)',
        cmp: <Button {...args} variant="accent" size="lg" />,
        cmpDisabled: <Button {...args} variant="accent" size="lg" disabled />,
      },
      {
        label: 'White (secondary)',
        cmp: <Button {...args} variant="white" size="lg" />,
        cmpDisabled: <Button {...args} variant="white" size="lg" disabled />,
      },
      {
        label: 'Plain (tertiary)',
        cmp: <Button {...args} variant="plain" size="lg" />,
        cmpDisabled: <Button {...args} variant="plain" size="lg" disabled />,
      },
      {
        label: 'Red Delete (danger primary)',
        cmp: <Button {...args} variant="red-delete" size="lg" />,
        cmpDisabled: <Button {...args} variant="red-delete" size="lg" disabled />,
      },
      {
        label: 'White Delete (danger secondary)',
        cmp: <Button {...args} variant="white-delete" size="lg" />,
        cmpDisabled: <Button {...args} variant="white-delete" size="lg" disabled />,
      },
      {
        label: 'Gray',
        cmp: <Button {...args} variant="gray" size="sm" />,
        cmpDisabled: <Button {...args} variant="gray" size="sm" disabled />,
      },
    ];

    return (
      <table className="ds:table-auto ds:border-collapse ds:border-spacing-0">
        <tbody>
          {/* Large */}
          <tr className="ds:border-b">
            <td className="ds:text-heading-4 ds:text-left ds:p-3">Large (default size)</td>
            <td className="ds:text-heading-4 ds:text-center ds:p-3">Normal</td>
            <td className="ds:text-heading-4 ds:text-center ds:p-3">Disabled</td>
          </tr>
          {lgButtons.map((button) => (
            <tr key={button.label} className="ds:border-b ds:border-b-secondary-5">
              <td className="ds:p-3 ds:text-body-2">{button.label}</td>
              <td className={`ds:p-3 ${button.label.includes('Plain') ? 'ds:pl-7' : ''}`}>{button.cmp}</td>
              <td className={`ds:p-3 ${button.label.includes('Plain') ? 'ds:pl-7' : ''}`}>{button.cmpDisabled}</td>
            </tr>
          ))}
          {/* Small */}
          <tr className="ds:border-b">
            <td className="ds:text-heading-4 ds:text-left ds:p-3 ds:pt-8">Small</td>
            <td className="ds:text-heading-4 ds:text-center ds:p-3 ds:pt-8">Normal</td>
            <td className="ds:text-heading-4 ds:text-center ds:p-3 ds:pt-8">Disabled</td>
          </tr>
          {smButtons.map((button) => (
            <tr key={button.label} className="ds:border-b ds:border-b-secondary-5">
              <td className="ds:p-3 ds:text-body-2">{button.label}</td>
              <td className={`ds:p-3 ${button.label.includes('Plain') ? 'ds:pl-7' : ''}`}>{button.cmp}</td>
              <td className={`ds:p-3 ${button.label.includes('Plain') ? 'ds:pl-7' : ''}`}>{button.cmpDisabled}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  args: {
    label: 'Lorem ipsum',
    onClick: fn(),
    variant: 'accent',
    serviceVariant: 'yksilo',
  },
};

export const White: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a white button component for triggering an action.',
      },
    },
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    variant: 'white',
  },
};

export const Gray: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a gray button component for triggering an action.',
      },
    },
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    variant: 'gray',
  },
};

export const RedDelete: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a red delete button component for triggering an action.',
      },
    },
  },
  args: {
    label: 'Poista',
    onClick: fn(),
    variant: 'red-delete',
  },
};

export const WhiteDelete: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a white delete button component for triggering an action.',
      },
    },
  },
  args: {
    label: 'Poista',
    onClick: fn(),
    variant: 'white-delete',
  },
};

export const Disabled: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a disabled button component.',
      },
    },
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    disabled: true,
  },
};

export const Small: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a small button component.',
      },
    },
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    size: 'sm',
  },
};

export const LargeWithLeftIcon: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a large button component with an left icon.',
      },
    },
  },
  args: {
    label: 'Takaisin',
    onClick: fn(),
    variant: 'white',
    iconSide: 'left',
    icon: <JodArrowLeft size={24} />,
  },
};

export const AsLink: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a link component that resembles the button component.',
      },
    },
  },
  args: {
    label: 'Kirjaudu sisään',
    size: 'lg',
    variant: 'accent',
    icon: <JodUser size={40} />,
    iconSide: 'left',
    LinkComponent: ({ children }: { children: React.ReactNode }) => <a href="/#">{children}</a>,
  },
};

export const OnlyIcon: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'This is a large button component with an left icon.',
      },
    },
  },
  args: {
    label: 'Takaisin',
    onClick: fn(),
    variant: 'white',
    icon: <JodArrowLeft size={24} />,
  },
};
