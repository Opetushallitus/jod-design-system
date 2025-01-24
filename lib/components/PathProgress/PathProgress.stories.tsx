import type { Meta, StoryObj } from '@storybook/react';

import { PathProgress } from './PathProgress';

const meta = {
  title: 'PathProgress',
  component: PathProgress,
  tags: ['autodocs'],
} satisfies Meta<typeof PathProgress>;

export default meta;

type Story = StoryObj<typeof meta>;
const decorators: Story['decorators'] = [
  (Story) => (
    <div className="ds:h-[600px]">
      <Story />
    </div>
  ),
];

export const Default: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6177&t=5Uc1JYa0GCm43PGV-4',
    },
    docs: {
      description: {
        story: 'Path progress component.',
      },
    },
  },
  render: (props) => {
    const onClick = (step: number) => console.log(`Clicked step ${step}`);
    return <PathProgress {...props} onClick={onClick} />;
  },
  args: {
    steps: 3,
    currentStep: 1,
  },
};

export const WithSelectedStep: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6177&t=5Uc1JYa0GCm43PGV-4',
    },
    docs: {
      description: {
        story: 'Path progress component.',
      },
    },
  },
  args: {
    steps: 3,
    currentStep: 3,
    selectedStep: 2,
  },
};
