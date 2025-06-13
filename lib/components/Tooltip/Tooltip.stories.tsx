import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TitledMeta } from '../../utils';

import { MdOutlineInfo } from 'react-icons/md';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProps } from './Tooltip';
import { TooltipContent } from './TooltipContent';
import { TooltipTrigger } from './TooltipTrigger';

const meta = {
  title: 'Popups/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Tooltip>;

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
  render: DefaultStoryRender,
};

const FocusOrHoverStoryRender = (props: TooltipProps) => {
  return (
    <div className="ds:flex">
      <span className="ds:text-form-label">Important label</span>
      <Tooltip {...props}>
        <TooltipTrigger>
          <MdOutlineInfo size={24} />
        </TooltipTrigger>
        <TooltipContent>This is very informative Tooltip for important label</TooltipContent>
      </Tooltip>
    </div>
  );
};

export const FocusOrHover: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Shows Tooltip when gaining focus or hovering with a mouse.',
      },
    },
  },
  args: {
    initialOpen: false,
  },
  render: FocusOrHoverStoryRender,
};

const ButtonAsTriggerRender = (props: TooltipProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip {...props} open={open} onOpenChange={setOpen}>
      <TooltipTrigger>
        <Button variant="white" label="Show Tooltip" onClick={() => setOpen((v) => !v)} />
      </TooltipTrigger>
      <TooltipContent>Lorem ipsum dolor sit amet, no vis verear commodo.</TooltipContent>
    </Tooltip>
  );
};

export const ButtonAsTrigger: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Shows Tooltip when pressing Button-component.',
      },
    },
  },
  args: {},
  render: ButtonAsTriggerRender,
};
