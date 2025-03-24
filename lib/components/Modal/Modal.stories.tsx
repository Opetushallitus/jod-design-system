import { useState } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { WizardProgress } from '../WizardProgress/WizardProgress';
import { Modal } from './Modal';

const meta = {
  title: 'Dialog/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ProgressComponent = () => (
  <WizardProgress
    labelText="Eteneminen"
    stepText="Vaihe"
    completedText="Valmis"
    currentText="Nykyinen"
    steps={4}
    currentStep={2}
  />
);
const LoremIpsum = ({ heading, length = 10 }: { heading: string; length?: number }) => {
  const loremIpsumText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget augue aliquam, varius ex nec, aliquet orci. Donec nec congue eros. Phasellus vulputate facilisis efficitur. Praesent non mi tellus. Donec lacinia congue condimentum. Ut suscipit, felis ac bibendum convallis, lectus nulla aliquet tortor, at egestas dolor ex non nunc. Aliquam id dolor ex. Sed eros arcu, scelerisque ut lorem nec, ornare rutrum magna. Nunc id leo condimentum massa convallis rhoncus id quis tortor. Mauris scelerisque ultrices mi, sit amet lobortis lorem placerat vitae. Etiam tincidunt interdum ante eu pretium. Integer suscipit velit et tortor gravida varius.';
  return (
    <>
      <p className="ds:font-bold">{heading}</p>
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
  const { open, onClose, ...rest } = args;
  const [isOpen, setIsOpen] = useState(open);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="ds:cursor-pointer">
        Open Modal example
      </button>
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
          <div className="ds:flex ds:flex-row ds:justify-between ds:gap-5">
            <div className="ds:flex ds:flex-row ds:gap-5">
              <Button label="Sulje" onClick={() => setIsOpen(false)} />
              <Button label="Lisää" />
            </div>
            <div className="ds:flex ds:flex-row ds:gap-5">
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
      className="ds:cursor-pointer ds:group ds:flex ds:select-none ds:items-center ds:gap-4 ds:rounded-[30px] ds:bg-white ds:px-6 ds:text-button-md ds:text-black ds:hover:text-accent ds:focus-visible:text-accent ds:focus-visible:outline ds:focus-visible:outline-[3px] ds:focus-visible:outline-offset-[1.5px] ds:focus-visible:outline-accent ds:active:bg-accent ds:active:text-white ds:active:outline-0"
      onClick={onClick}
    >
      <span className="ds:py-[10px] ds:group-hover:underline ds:group-focus-visible:no-underline ds:group-active:no-underline">
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

export const DefaultWithoutSidePanel: Story = {
  render,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7639&t=b8o6NAta57e3aj8E-1',
    },
    docs: {
      description: {
        story: 'This is a modal component without side panel.',
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    content: <LoremIpsum heading="Content" />,
    footer: <>/</>,
  },
};

export const DynamicContent: Story = {
  render: (args: Story['args']) => {
    const { open, onClose, ...rest } = args;
    const [isOpen, setIsOpen] = useState(open);
    const [hasProgress, setHasProgress] = useState(false);
    const [hasSidePanel, setHasSidePanel] = useState(false);
    const [loremIpsumLength, setLoremIpsumLength] = useState(3);

    return (
      <>
        <button onClick={() => setIsOpen(true)} className="ds:cursor-pointer">
          Open Modal example
        </button>
        <Modal
          {...rest}
          sidePanel={hasSidePanel ? <LoremIpsum heading="Side panel" length={loremIpsumLength} /> : null}
          progress={hasProgress ? <ProgressComponent /> : null}
          content={
            <>
              <div className="ds:flex ds:flex-row ds:gap-4">
                <button
                  type="button"
                  onClick={() => setHasProgress(!hasProgress)}
                  className="ds:cursor-pointer ds:shadow-border ds:bg-accent ds:text-white ds:p-5"
                >
                  Toggle progress
                </button>
                <button
                  type="button"
                  onClick={() => setHasSidePanel(!hasSidePanel)}
                  className="ds:cursor-pointer ds:shadow-border ds:bg-accent ds:text-white ds:p-5"
                >
                  Toggle side panel
                </button>
                <div className="ds:flex ds:flex-col">
                  <label htmlFor="loremIpsumLength">Lorem ipsum length</label>
                  <input
                    id="loremIpsumLength"
                    className="ds:p-3"
                    type="number"
                    value={loremIpsumLength}
                    onChange={(e) => setLoremIpsumLength(parseInt(e.target.value, 10))}
                    min={0}
                    max={20}
                  />
                </div>
              </div>
              <hr className="ds:my-4" />
              <LoremIpsum heading="This is a modal with dynamic content for testing" length={loremIpsumLength} />
            </>
          }
          open={isOpen}
          onClose={() => {
            if (onClose) {
              onClose();
            }
            setIsOpen(false);
          }}
          footer={<Button label="Sulje" onClick={() => setIsOpen(false)} />}
        />
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
        story: 'This is a modal with dynamic content for testing.',
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    content: <>/</>,
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
    progress: <ProgressComponent />,
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
    progress: <ProgressComponent />,
  },
};
