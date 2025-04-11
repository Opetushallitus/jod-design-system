import { action } from '@storybook/addon-actions';
import { useArgs, useState } from '@storybook/preview-api';
import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';
import { Checkbox, CheckboxProps } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Checkbox>;

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

export const IndeterminateCheckbox: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story:
          'This is a indeterminate checkbox that cycles between unchecked → indeterminate → checked → unchecked states.',
      },
    },
  },
  args: {
    name: 'indeterminate-state-checkbox',
    value: 'indeterminate-state',
    checked: false,
    label: 'Indeterminate checkbox',
    ariaLabel: 'Indeterminate checkbox',
  },
  render: () => {
    const [state, setState] = useState<'unchecked' | 'indeterminate' | 'checked'>('unchecked');

    const cycleState = () => {
      if (state === 'unchecked') {
        setState('indeterminate');
      } else if (state === 'indeterminate') {
        setState('checked');
      } else {
        setState('unchecked');
      }
    };

    return (
      <div className="ds:flex ds:flex-col ds:gap-4">
        <Checkbox
          name="indeterminate-state-checkbox"
          value="indeterminate-state"
          checked={state === 'checked'}
          indeterminate={state === 'indeterminate'}
          onChange={cycleState}
          label="Indeterminate-state checkbox"
          ariaLabel="Indeterminate-state checkbox"
        />
        <Checkbox
          name="indeterminate-state-checkbox"
          value="indeterminate-state"
          checked={state === 'checked'}
          indeterminate={state === 'indeterminate'}
          onChange={cycleState}
          label="Indeterminate-state checkbox with Bordered"
          ariaLabel="Indeterminate-state checkbox"
          variant="bordered"
        />
      </div>
    );
  },
};

export const IndeterminateCheckboxWithChildren: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story:
          'A practical example of the indeterminate state with a parent checkbox controlling multiple child checkboxes.',
      },
    },
  },
  args: {
    name: 'parent',
    value: 'parent',
    checked: false,
    label: 'Select all items',
    ariaLabel: 'Select all items',
  },
  render: () => {
    // Track states of children checkboxes
    const [childrenState, setChildrenState] = useState([false, false, false]);

    // Calculate parent state based on children
    const allChecked = childrenState.every((state) => state);
    const someChecked = childrenState.some((state) => state);
    const parentChecked = allChecked;
    const parentIndeterminate = someChecked && !allChecked;

    const handleParentChange = () => {
      const newState = !allChecked;
      setChildrenState(childrenState.map(() => newState));
    };

    const handleChildChange = (index: number) => {
      const newChildrenState = [...childrenState];
      newChildrenState[index] = !newChildrenState[index];
      setChildrenState(newChildrenState);
    };

    return (
      <div className="ds:flex ds:flex-col ds:gap-3">
        <Checkbox
          name="parent"
          value="parent"
          checked={parentChecked}
          indeterminate={parentIndeterminate}
          onChange={handleParentChange}
          label="Select all items"
          ariaLabel="Select all items"
        />
        <div className="ds:ml-6 ds:flex ds:flex-col ds:gap-2">
          {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
            <Checkbox
              key={item}
              name={`child-${index}`}
              value={`child-${index}`}
              checked={childrenState[index]}
              onChange={() => handleChildChange(index)}
              label={item}
              ariaLabel={item}
            />
          ))}
        </div>

        <div className="mt-10" />
        <Checkbox
          name="parent"
          value="parent"
          checked={parentChecked}
          indeterminate={parentIndeterminate}
          onChange={handleParentChange}
          label="Select all items (with Bordered)"
          ariaLabel="Select all items (with Bordered)"
          variant="bordered"
        />
        <div className="ds:ml-6 ds:flex ds:flex-col ds:gap-2">
          {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
            <Checkbox
              key={item}
              name={`child-${index}`}
              value={`child-${index}`}
              checked={childrenState[index]}
              onChange={() => handleChildChange(index)}
              label={item}
              ariaLabel={item}
              variant="bordered"
            />
          ))}
        </div>
      </div>
    );
  },
};
