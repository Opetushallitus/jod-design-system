import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../../main';
import { Modal } from './Modal';

const meta = {
  title: 'Dialog/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const argTypes: Story['argTypes'] = {
  onClose: {
    table: {
      disable: true,
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  renderFooter: {
    table: {
      disable: true,
    },
  },
};

const confirmBeforeClose: Story['args']['confirmBeforeClose'] = {
  translations: {
    title: 'Are you sure you want to close?',
    description: 'If you close, you will lose any unsaved changes.',
    noLabel: 'No',
    yesLabel: 'Yes',
  },
};

const LoremIpsum = ({ heading, length = 10 }: { heading: string; length?: number }) => {
  const loremIpsumText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget augue aliquam, varius ex nec, aliquet orci. Donec nec congue eros. Phasellus vulputate facilisis efficitur. Praesent non mi tellus. Donec lacinia congue condimentum. Ut suscipit, felis ac bibendum convallis, lectus nulla aliquet tortor, at egestas dolor ex non nunc. Aliquam id dolor ex. Sed eros arcu, scelerisque ut lorem nec, ornare rutrum magna. Nunc id leo condimentum massa convallis rhoncus id quis tortor. Mauris scelerisque ultrices mi, sit amet lobortis lorem placerat vitae. Etiam tincidunt interdum ante eu pretium. Integer suscipit velit et tortor gravida varius.';
  return (
    <>
      <p className="ds:text-heading-2 ds:mb-5">{heading}</p>
      <div className="ds:flex ds:flex-col ds:gap-4">
        {Array.from({ length }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>{loremIpsumText}</p>
        ))}
      </div>
    </>
  );
};

const render = (args: Story['args']) => {
  const { open, onClose, renderFooter, ...rest } = args;
  const [isOpen, setIsOpen] = useState(open);

  return (
    <>
      <Button label="Open Modal example" variant="white" onClick={() => setIsOpen(true)} />
      <Modal
        {...rest}
        open={isOpen}
        onClose={() => {
          if (onClose) {
            onClose();
          }
          setIsOpen(false);
        }}
        renderFooter={renderFooter}
      />
    </>
  );
};

export const Default: Story = {
  render,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7639&t=b8o6NAta57e3aj8E-1',
    },
    docs: {
      description: {
        story: 'This is a modal component.',
      },
    },
  },
  argTypes,
  args: {
    open: false,
    onClose: fn(),
    children: <LoremIpsum heading="Content" />,
    renderFooter: (onCloseClick) => (
      <div className="ds:flex ds:flex-row ds:justify-between ds:gap-5">
        <div className="ds:flex ds:flex-row ds:gap-5">
          <Button label="Close" variant="white" onClick={onCloseClick} />
          <Button label="Add" variant="white" />
        </div>
        <div className="ds:flex ds:flex-row ds:gap-5">
          <Button label="Previous" variant="white" />
          <Button label="Next" variant="white" />
          <Button label="Save" variant="white" />
        </div>
      </div>
    ),
    confirmBeforeClose,
  },
};

export const Mobile: Story = {
  render,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729-23078',
    },
    docs: {
      description: {
        story: 'Mobile version of the modal.',
      },
    },
  },
  argTypes,
  args: {
    open: false,
    onClose: fn(),
    children: <LoremIpsum heading="Content" />,
    renderFooter: (onCloseClick) => (
      <div className="ds:flex ds:flex-row ds:justify-between ds:gap-5">
        <div className="ds:flex ds:flex-row ds:gap-5">
          <Button label="Close" variant="white" onClick={onCloseClick} />
          <Button label="Add" variant="white" />
        </div>
        <div className="ds:flex ds:flex-row ds:gap-5">
          <Button label="Previous" variant="white" />
          <Button label="Next" variant="white" />
          <Button label="Save" variant="white" />
        </div>
      </div>
    ),
    confirmBeforeClose,
  },
};
