import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { WizardProgress } from '../WizardProgress/WizardProgress';
import { Modal } from './Modal';

const meta = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const LoremIpsum = ({ heading }: { heading: string }) => {
  const loremIpsumText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget augue aliquam, varius ex nec, aliquet orci. Donec nec congue eros. Phasellus vulputate facilisis efficitur. Praesent non mi tellus. Donec lacinia congue condimentum. Ut suscipit, felis ac bibendum convallis, lectus nulla aliquet tortor, at egestas dolor ex non nunc. Aliquam id dolor ex. Sed eros arcu, scelerisque ut lorem nec, ornare rutrum magna. Nunc id leo condimentum massa convallis rhoncus id quis tortor. Mauris scelerisque ultrices mi, sit amet lobortis lorem placerat vitae. Etiam tincidunt interdum ante eu pretium. Integer suscipit velit et tortor gravida varius.';
  return (
    <>
      <p className="font-bold">{heading}</p>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index}>{loremIpsumText}</p>
        ))}
      </div>
    </>
  );
};

const render = (args: Story['args']) => {
  const { open, onClose, ...rest } = args;
  const [isOpen, setIsOpen] = React.useState(open);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal example</button>
      <Modal
        {...rest}
        open={isOpen}
        onClose={() => {
          if (onClose) {
            onClose();
          }
          setIsOpen(false);
        }}
        footer={
          <div className="flex flex-row justify-between gap-5">
            <div className="flex flex-row gap-5">
              <Button label="Sulje" onClick={() => setIsOpen(false)} />
              <Button label="Lisää" />
            </div>
            <div className="flex flex-row gap-5">
              <Button label="Edellinen" />
              <Button label="Seuraava" />
              <Button label="Tallenna" />
            </div>
          </div>
        }
      />
    </>
  );
};

const Button = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <button
      className="group flex select-none items-center gap-4 rounded-[30px] bg-white px-6 text-button-md text-black hover:text-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1.5px] focus-visible:outline-accent active:bg-accent active:text-white active:outline-0"
      onClick={onClick}
    >
      <span className="py-[10px] group-hover:underline group-focus-visible:no-underline group-active:no-underline">
        {label}
      </span>
    </button>
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
        story: 'This is a modal component',
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    content: <LoremIpsum heading="Content" />,
    sidePanel: <LoremIpsum heading="Side panel" />,
    footer: <>/</>,
  },
};

export const Progress: Story = {
  render,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=541-16019',
    },
    docs: {
      description: {
        story: 'This has content in progress slot',
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    content: <LoremIpsum heading="Content" />,
    sidePanel: <LoremIpsum heading="Side panel" />,
    footer: <>/</>,
    progress: <WizardProgress steps={4} currentStep={2} />,
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
        story: 'Mobile version of the Modal',
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    content: <LoremIpsum heading="Content" />,
    sidePanel: <LoremIpsum heading="Side panel" />,
    footer: <>/</>,
  },
};

export const MobileWithProgress: Story = {
  render,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729-23000',
    },
    docs: {
      description: {
        story: 'Mobile version of the Modal, with progress slot.',
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    content: <LoremIpsum heading="Content" />,
    sidePanel: <LoremIpsum heading="Side panel" />,
    footer: <>/</>,
    progress: <WizardProgress steps={4} currentStep={2} />,
  },
};
