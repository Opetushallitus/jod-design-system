import type { Meta, StoryObj } from '@storybook/react';

import { WizardProgress } from './WizardProgress';

const meta = {
  title: 'Wizard/WizardProgress',
  component: WizardProgress,
  tags: ['autodocs'],
} satisfies Meta<typeof WizardProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div lang="fi">
        <button className="ds:sr-only">Interaktiivinen elementti</button>
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-6678',
    },
    docs: {
      description: {
        story: 'This is a wizard progress component.',
      },
    },
  },
  args: {
    steps: 5,
    currentStep: 2,
    stepText: 'Vaihe',
    completedText: 'Valmis',
    currentText: 'Nykyinen',
    labelText: 'Eteneminen',
  },
};
