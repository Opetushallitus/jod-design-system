import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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
      <p className="ds-font-bold">{heading}</p>
      <div className="ds-flex ds-flex-col ds-gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index}>{loremIpsumText}</p>
        ))}
      </div>
    </>
  );
};

const render = (args: Story['args']) => {
  const { open, onClose, ...rest } = args;
  const [isOpen, setIsOpen] = useState(open);

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
          <div className="ds-flex ds-flex-row ds-justify-between ds-gap-5">
            <div className="ds-flex ds-flex-row ds-gap-5">
              <Button label="Sulje" onClick={() => setIsOpen(false)} />
              <Button label="Lisää" />
            </div>
            <div className="ds-flex ds-flex-row ds-gap-5">
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
      className="ds-group ds-flex ds-select-none ds-items-center ds-gap-4 ds-rounded-[30px] ds-bg-white ds-px-6 ds-text-button-md ds-text-black hover:ds-text-accent focus-visible:ds-text-accent focus-visible:ds-outline focus-visible:ds-outline-[3px] focus-visible:ds-outline-offset-[1.5px] focus-visible:ds-outline-accent active:ds-bg-accent active:ds-text-white active:ds-outline-0"
      onClick={onClick}
    >
      <span className="ds-py-[10px] group-hover:ds-underline group-focus-visible:ds-no-underline group-active:ds-no-underline">
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
        story: 'This is a modal component.',
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
        story: 'This has content in progress slot.',
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
        story: 'Mobile version of the modal.',
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
