import type { StoryObj } from '@storybook/react-vite';
import { useState } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  const { value, onChange, ...rest } = args;
  const [textareaValue, setTextareaValue] = useState(value);
  return (
    <Textarea
      value={textareaValue}
      onChange={(event) => {
        setTextareaValue(event.target.value);
        onChange(event);
      }}
      {...rest}
    />
  );
};
const url = 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=5805-3164';
const label = 'Label text';
const loremIpsum = 'Lorem ipsum dolor sit amet';

export const Default: Story = {
  render,
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

export const ErrorMessage: Story = {
  render,
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'This is a textarea component for displaying and editing a value with a label and error text.',
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
