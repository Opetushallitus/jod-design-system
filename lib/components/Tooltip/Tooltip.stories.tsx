import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TitledMeta } from '../../utils';

import { JodInfo } from '../../icons';
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
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=15899-157704',
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
        <TooltipTrigger toggleOnClick>
          <JodInfo />
        </TooltipTrigger>
        <TooltipContent>This is a very informative Tooltip for an important label</TooltipContent>
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
      <TooltipTrigger asChild>
        <Button variant="accent" label="Show Tooltip" onClick={() => setOpen((v) => !v)} />
      </TooltipTrigger>
      <TooltipContent>
        <div className="ds:font-bold ds:text-body-xs ds:mb-2">Tooltip Title</div>
        <div className="ds:text-body-xs">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </TooltipContent>
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
