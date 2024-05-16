import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipProps } from './Tooltip';
import { TooltipTrigger } from './TooltipTrigger';
import { TooltipContent } from './TooltipContent';

const meta = {
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542-8065',
  },
};

const DefaultStoryRender = (props: TooltipProps) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Tooltip {...props} open={open} onOpenChange={setOpen}>
      <TooltipTrigger onClick={() => setOpen((v) => !v)}>Trigger</TooltipTrigger>
      <TooltipContent>Lorem ipsum dolor sit amet, no vis verear commodo.</TooltipContent>
    </Tooltip>
  );
};

export const Default: Story = {
  parameters: {
    ...parameters,
  },
  args: {},
  render: (args) => {
    return <DefaultStoryRender {...args} />;
  },
};
