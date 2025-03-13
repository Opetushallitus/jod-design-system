import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../main';
import { Modal } from './Modal';

const meta = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const argTypes: Story['argTypes'] = {
  ref: {
    control: {
      disable: true,
    },
  },
  children: {
    control: {
      disable: true,
    },
  },
  confirmRef: {
    control: {
      disable: true,
    },
  },
  confirmYesRef: {
    control: {
      disable: true,
    },
  },
};

export const Default: Story = {
  render: (args: Story['args']) => {
    return (
      <>
        <Button label="Open Modal" onClick={() => args.ref.current?.showModal()} variant="white" />
        <Modal ref={args.ref}>
          <div className="ds:flex ds:flex-col">
            <div className="ds:flex ds:flex-col ds:gap-5 ds:p-5">
              <h2 className="ds:text-heading-2">This is a modal dialog!</h2>
              <p className="ds:text-body-sm ds:font-arial">This is the modal dialog content.</p>
            </div>
            <div className="ds:flex ds:gap-3 ds:p-3 ds:justify-end ds:bg-bg-gray-2" role="group">
              <Button label="Close" onClick={() => args.ref.current?.close()} variant="white" />
            </div>
          </div>
        </Modal>
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
  argTypes,
  args: {
    ref: React.createRef(),
  },
};

export const ConfirmClose: Story = {
  render: (args: Story['args']) => {
    const confirmRef = React.createRef<HTMLDialogElement>();
    const confirmYesRef = React.createRef<HTMLButtonElement>();

    return (
      <>
        <Button label="Open Modal" onClick={() => args.ref.current?.showModal()} variant="white" />
        <Modal ref={args.ref} confirmRef={confirmRef} confirmYesRef={confirmYesRef}>
          <div className="ds:flex ds:flex-col">
            <div className="ds:flex ds:flex-col ds:gap-5 ds:p-5">
              <h2 className="ds:text-heading-2">This is a modal dialog!</h2>
              <p className="ds:text-body-sm ds:font-arial">This is the modal dialog content.</p>
            </div>
            <div className="ds:flex ds:gap-3 ds:p-3 ds:justify-end ds:bg-bg-gray-2" role="group">
              <Button
                label="Close"
                onClick={() => {
                  confirmRef.current?.showModal();
                  confirmYesRef.current?.focus();
                }}
                variant="white"
              />
            </div>
          </div>
        </Modal>
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
        story: 'This is a modal dialog with a confirm dialog.',
      },
    },
  },
  argTypes,
  args: {
    ref: React.createRef(),
  },
};

export const NestedModalWithConfirmClose: Story = {
  render: (args: Story['args']) => {
    const innerRef = React.createRef<HTMLDialogElement>();
    const confirmRef = React.createRef<HTMLDialogElement>();
    const confirmYesRef = React.createRef<HTMLButtonElement>();
    const innerConfirmRef = React.createRef<HTMLDialogElement>();
    const innerConfirmYesRef = React.createRef<HTMLButtonElement>();

    return (
      <>
        <Button label="Open Modal" onClick={() => args.ref.current?.showModal()} variant="white" />
        <Modal ref={args.ref} confirmRef={confirmRef} confirmYesRef={confirmYesRef}>
          <div className="ds:flex ds:flex-col">
            <div className="ds:flex ds:flex-col ds:gap-5 ds:p-5">
              <h2 className="ds:text-heading-2">This is an outer modal dialog!</h2>
              <p className="ds:text-body-sm ds:font-arial">This is the outer modal dialog content.</p>
              <div>
                <Button label="Open inner Modal" onClick={() => innerRef.current?.showModal()} />
                <Modal ref={innerRef} confirmRef={innerConfirmRef} confirmYesRef={innerConfirmYesRef}>
                  <div className="ds:flex ds:flex-col ds:gap-5 ds:p-5">
                    <p>This is the inner modal dialog content.</p>
                    <div>
                      <Button
                        label="Close"
                        onClick={() => {
                          innerConfirmRef.current?.showModal();
                          innerConfirmYesRef.current?.focus();
                        }}
                      />
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <div className="ds:flex ds:gap-3 ds:p-3 ds:justify-end ds:bg-bg-gray-2" role="group">
              <Button
                label="Close"
                onClick={() => {
                  confirmRef.current?.showModal();
                  confirmYesRef.current?.focus();
                }}
                variant="white"
              />
            </div>
          </div>
        </Modal>
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
  argTypes,
  args: {
    ref: React.createRef(),
  },
};
