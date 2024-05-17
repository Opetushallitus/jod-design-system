import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { useEffect, useState } from 'react';

import { WizardProgress } from './WizardProgress';

const meta = {
  title: 'Wizard/WizardProgress',
  component: WizardProgress,
  tags: ['autodocs'],
} satisfies Meta<typeof WizardProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
  },
  render: (args) => {
    const [, setArgs] = useArgs();
    const [value, setValue] = useState<number>(args.currentStep);

    useEffect(() => {
      action('onChange')(args.currentStep);
      setValue(args.currentStep);
    }, [args.currentStep]);

    const onChange = (value: number) => {
      action('onChange')(value);
      setArgs({ currentStep: value });
      setValue(value);
    };

    return <WizardProgress {...args} currentStep={value} onChange={onChange} />;
  },
};
