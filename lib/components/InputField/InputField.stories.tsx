import type { StoryObj } from '@storybook/react-vite';
import { useState } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { InputField } from './InputField';

const meta = {
  title: 'Forms/InputField',
  component: InputField,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  const { value, onChange, ...rest } = args;
  const [textValue, setTextValue] = useState(value);
  return (
    <InputField
      value={textValue}
      onChange={(event) => {
        setTextValue(event.target.value);
        onChange(event);
      }}
      {...rest}
    />
  );
};
const url = 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7019&t=RZCfmzkZuXUFBRkG-4';
const label = 'Label text';
const loremIpsum = 'Lorem ipsum dolor sit amet';

export const Default: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a input field component for displaying and editing a value with a label text.',
      },
    },
  },
  args: {
    value: loremIpsum,
    onChange: fn(),
    label,
  },
};

export const HelpText: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a input field component for displaying and editing a value with a label and help text.',
      },
    },
  },
  args: {
    value: loremIpsum,
    onChange: fn(),
    label,
    help: 'Help text',
  },
};

export const Placeholder: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a input field component for displaying and editing a value with placeholder text.',
      },
    },
  },
  args: {
    value: '',
    onChange: fn(),
    label,
    placeholder: loremIpsum,
  },
};

export const Required: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a input field component with a required text after the label.',
      },
    },
  },
  args: {
    value: loremIpsum,
    onChange: fn(),
    label,
    requiredText: 'required',
  },
};

export const ErrorMessage: Story = {
  render,
  decorators: [
    (Story) => (
      <div className="ds:max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a input field component for displaying and editing a value with a label and error text.',
      },
    },
  },
  args: {
    value: loremIpsum,
    onChange: fn(),
    label,
    errorMessage: 'Error message',
  },
};
