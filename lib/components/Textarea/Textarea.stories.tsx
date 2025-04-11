import { useState } from '@storybook/preview-api';
import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import type { TitledMeta } from '../../utils';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: Story['args']) => {
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
  },
  decorators: [
    (Story) => (
      <div className="ds:max-w-[480px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=5805-3164',
    },
    docs: {
      description: {
        story: 'This is a input field component for displaying and editing a value with a label text.',
      },
    },
  },
  args: {
    value: 'Lorem ipsum dolor sit amet',
    onChange: fn(),
    label: 'Label text',
  },
};
