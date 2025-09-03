import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';
import { Select } from './Select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const design = {
  type: 'figma',
  url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7243&t=RDNOudQv5NR9oxZQ-4',
};

const options = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

const label = 'Choose language';

const decorators: Story['decorators'] = [
  (Story) => {
    return (
      <div className="ds:min-h-[250px]">
        <Story />
      </div>
    );
  },
];

export const Default: Story = {
  decorators,
  parameters: {
    design,
    docs: {
      description: {
        story: 'Select component for selecting a value from a list.',
      },
    },
  },
  args: {
    label,
    placeholder: label,
    options,
  },
};

export const Disabled: Story = {
  decorators,
  parameters: {
    design,
    docs: {
      description: {
        story: 'Disabled select component. User cannot interact with the component.',
      },
    },
  },
  args: {
    disabled: true,
    label,
    placeholder: label,
    options,
  },
};

export const WithPreselectedValue: Story = {
  decorators,
  parameters: {
    design,
    docs: {
      description: {
        story: 'Select component with preselected value',
      },
    },
  },
  args: {
    label,
    placeholder: label,
    selected: 'en',
    options,
  },
};
