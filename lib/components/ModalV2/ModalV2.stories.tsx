import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { Button } from '../../main';
import { ModalV2 } from './ModalV2';

const meta = {
  title: 'Modal',
  component: ModalV2,
  tags: ['autodocs'],
} satisfies Meta<typeof ModalV2>;

export default meta;

type Story = StoryObj<typeof meta>;

const confirmBeforeClose: Story['args']['confirmBeforeClose'] = {
  enabled: true,
  translations: {
    title: 'Are you sure you want to close?',
    description: 'If you close, you will lose any unsaved changes.',
    noLabel: 'No',
    yesLabel: 'Yes',
  },
};

export const Default: Story = {
  render: () => {
    const [args, updateArgs] = useArgs<Story['args']>();

    const setOpen = (value: React.SetStateAction<boolean>) => {
      updateArgs({ open: value as boolean });
      args.setOpen(value);
    };

    return (
      <>
        <Button label="Open Modal" onClick={() => setOpen(true)} variant="white" />
        <ModalV2 {...args} setOpen={(value) => setOpen(value)}>
          {(onCloseClick) => (
            <div className="ds:flex ds:flex-col">
              <div className="ds:flex ds:flex-col ds:gap-5 ds:max-w-[1092px] ds:px-6 ds:py-5 ds:sm:px-9">
                <h2 className="ds:text-heading-2">This is a modal dialog!</h2>
                <p className="ds:text-body-sm ds:font-arial">This is the modal dialog content.</p>
              </div>
              <div
                className="ds:flex ds:gap-5 ds:px-6 ds:py-5 ds:sm:px-9 ds:justify-end ds:overflow-x-auto ds:bg-bg-gray-2"
                role="group"
              >
                <Button label="Close" onClick={onCloseClick} variant="white" />
              </div>
            </div>
          )}
        </ModalV2>
      </>
    );
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7639&t=b8o6NAta57e3aj8E-1',
    },
    docs: {
      description: {
        story: 'This is a modal dialog.',
      },
    },
  },
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
    },
    setOpen: {
      table: {
        disable: true,
      },
    },
    confirmBeforeClose: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    open: false,
    setOpen: fn(),
  },
};

export const ConfirmBeforeClose: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button label="Open Modal" onClick={() => setOpen(true)} variant="white" />
        <ModalV2 open={open} setOpen={(value) => setOpen(value)} confirmBeforeClose={args.confirmBeforeClose}>
          {(onCloseClick) => (
            <div className="ds:flex ds:flex-col">
              <div className="ds:flex ds:flex-col ds:gap-5 ds:max-w-[1092px] ds:px-6 ds:py-5 ds:sm:px-9">
                <h2 className="ds:text-heading-2">This is a modal dialog!</h2>
                <p className="ds:text-body-sm ds:font-arial">This is the modal dialog content.</p>
              </div>
              <div
                className="ds:flex ds:gap-5 ds:px-6 ds:py-5 ds:sm:px-9 ds:justify-end ds:overflow-x-auto ds:bg-bg-gray-2"
                role="group"
              >
                <Button label="Close" onClick={onCloseClick} variant="white" />
              </div>
            </div>
          )}
        </ModalV2>
      </>
    );
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7639&t=b8o6NAta57e3aj8E-1',
    },
    docs: {
      description: {
        story: 'This is a modal dialog with a confirm dialog before closing.',
      },
    },
  },
  argTypes: {
    open: {
      table: {
        disable: true,
      },
    },
    setOpen: {
      table: {
        disable: true,
      },
    },
    confirmBeforeClose: {
      control: {
        type: 'object',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    open: false,
    setOpen: fn(),
    confirmBeforeClose,
  },
};

export const NestedModalWithConfirmBeforeClose: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [innerOpen, setInnerOpen] = React.useState(false);

    return (
      <>
        <Button label="Open Modal" onClick={() => setOpen(true)} variant="white" />
        <ModalV2 open={open} setOpen={(value) => setOpen(value)} confirmBeforeClose={args.confirmBeforeClose}>
          {(onCloseClick) => (
            <div className="ds:flex ds:flex-col">
              <div className="ds:flex ds:flex-col ds:gap-5 ds:max-w-[1092px] ds:px-6 ds:py-5 ds:sm:px-9">
                <h2 className="ds:text-heading-2">This is an outer modal dialog!</h2>
                <p className="ds:text-body-sm ds:font-arial">This is the outer modal dialog content.</p>
                <div>
                  <Button label="Open inner Modal" onClick={() => setInnerOpen(true)} />
                  <ModalV2 open={innerOpen} setOpen={setInnerOpen} confirmBeforeClose={args.confirmBeforeClose}>
                    {(onCloseClick) => (
                      <div className="ds:flex ds:flex-col ds:gap-5 ds:p-5">
                        <p>This is the inner modal dialog content.</p>
                        <div>
                          <Button label="Close" onClick={onCloseClick} />
                        </div>
                      </div>
                    )}
                  </ModalV2>
                </div>
              </div>
              <div
                className="ds:flex ds:gap-5 ds:px-6 ds:py-5 ds:sm:px-9 ds:justify-end ds:overflow-x-auto ds:bg-bg-gray-2"
                role="group"
              >
                <Button label="Close" onClick={onCloseClick} variant="white" />
              </div>
            </div>
          )}
        </ModalV2>
      </>
    );
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7639&t=b8o6NAta57e3aj8E-1',
    },
    docs: {
      description: {
        story:
          'This is a modal dialog with a confirm dialog and a nested modal dialog. Avoid using nested modals if possible.',
      },
    },
  },
  argTypes: {
    open: {
      table: {
        disable: true,
      },
    },
    setOpen: {
      table: {
        disable: true,
      },
    },
    confirmBeforeClose: {
      control: {
        type: 'object',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    open: false,
    setOpen: fn(),
    confirmBeforeClose,
  },
};
