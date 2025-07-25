import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { Combobox } from './Combobox';

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;
const label = 'Choose language';
const decorators: Story['decorators'] = [
  (Story) => (
    <div className="ds:min-h-[250px]">
      <Story />
    </div>
  ),
];
const design = {
  type: 'figma',
  url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7243&t=RDNOudQv5NR9oxZQ-4',
};

export const Default: Story = {
  decorators,
  parameters: {
    design,
    docs: {
      description: {
        story: 'Combobox component for selecting a value from a list.',
      },
    },
  },
  args: {
    label,
    placeholder: label,
    options: [
      { label: 'Suomi', value: 'fi' },
      { label: 'Svenska', value: 'sv' },
      { label: 'English', value: 'en' },
    ],
  },
};

export const Disabled: Story = {
  parameters: {
    design,
    docs: {
      description: {
        story: 'Disabled combobox component. User cannot interact with the component.',
      },
    },
  },
  args: {
    disabled: true,
    label,
    placeholder: label,
    options: [
      { label: 'Suomi', value: 'fi' },
      { label: 'Svenska', value: 'sv' },
      { label: 'English', value: 'en' },
    ],
  },
};

export const WithDefaultValue: Story = {
  decorators,
  parameters: {
    design,
    docs: {
      description: {
        story: 'Combobox component with default value',
      },
    },
  },
  args: {
    label,
    placeholder: label,
    defaultValue: 'en',
    options: [
      { label: 'Suomi', value: 'fi' },
      { label: 'Svenska', value: 'sv' },
      { label: 'English', value: 'en' },
    ],
  },
};
