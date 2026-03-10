import type { StoryObj } from '@storybook/react-vite';
import { useState } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodArrowLeft, JodCheckmark } from '../../icons';
import type { TitledMeta } from '../../utils';
import { Button } from '../Button/Button';
import { WizardProgress } from '../WizardProgress/WizardProgress';
import { Modal, ModalProps } from './Modal';

const meta = {
  title: 'Popups/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Modal>;

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

const commonDesignParams = {
  type: 'figma',
  url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7639&t=b8o6NAta57e3aj8E-1',
} as const;

const commonArgTypes = {
  content: { control: false },
  sidePanel: { control: false },
  footer: { control: false },
  progress: { control: false },
} as const;

const commonArgs: ModalProps = {
  name: 'Modal example',
  open: false,
  onClose: fn(),
  content: <>/</>,
  footer: <>/</>,
} as const;

const render = (args: Story['args']) => {
  const { open, onClose, ...rest } = args;
  const [isOpen, setIsOpen] = useState(open);
  const { sm } = useMediaQueries();

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
          <div className="ds:flex ds:flex-row ds:justify-between ds:gap-5 ds:flex-1">
            <div className="ds:flex ds:flex-row ds:gap-5">
              <Button label="Sulje" onClick={() => setIsOpen(false)} size={sm ? 'lg' : 'sm'} />
              <Button label="Lisää" size={sm ? 'lg' : 'sm'} />
            </div>
            <div className="ds:flex ds:flex-row ds:gap-5">
              <Button label="Edellinen" size={sm ? 'lg' : 'sm'} icon={sm ? undefined : <JodArrowLeft />} />
              <Button
                variant="accent"
                label="Tallenna"
                size={sm ? 'lg' : 'sm'}
                icon={sm ? undefined : <JodCheckmark />}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export const Default: Story = {
  render,
  parameters: {
    design: commonDesignParams,
    docs: {
      description: {
        story: 'This is a modal component.',
      },
    },
  },
  argTypes: { ...commonArgTypes },
  args: {
    ...commonArgs,
    content: <LoremIpsum heading="Content" />,
    sidePanel: <LoremIpsum heading="Side panel" />,
  },
};

export const DefaultWithoutSidePanel: Story = {
  render,
  parameters: {
    design: commonDesignParams,
    docs: {
      description: {
        story: 'This is a modal component without side panel.',
      },
    },
  },
  argTypes: { ...commonArgTypes },
  args: {
    ...commonArgs,
    content: <LoremIpsum heading="Content" />,
  },
};

export const FullWidthContent: Story = {
  render,
  parameters: {
    design: commonDesignParams,
    docs: {
      description: {
        story: 'This is a modal component with full width content. Should only be used without side panel.',
      },
    },
  },
  argTypes: { ...commonArgTypes },
  args: {
    ...commonArgs,
    content: <LoremIpsum heading="Content" />,
    fullWidthContent: true,
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
                  className="ds:cursor-pointer ds:shadow-border ds:bg-accent ds:text-white ds:p-2"
                >
                  Toggle progress
                </button>
                <button
                  type="button"
                  onClick={() => setHasSidePanel(!hasSidePanel)}
                  className="ds:cursor-pointer ds:shadow-border ds:bg-accent ds:text-white ds:p-2"
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
                    onChange={(e) => setLoremIpsumLength(Number.parseInt(e.target.value, 10))}
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
  argTypes: { ...commonArgTypes },
  args: {
    ...commonArgs,
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
  argTypes: { ...commonArgTypes },
  args: {
    ...commonArgs,
    content: <LoremIpsum heading="Content" />,
    sidePanel: <LoremIpsum heading="Side panel" />,
    progress: <ProgressComponent />,
    topSlot: <h2 className="ds:text-heading-2-mobile ds:sm:text-hero">Test title</h2>,
  },
};

export const MultipleStackedModals: Story = {
  render: () => {
    // Yhtenäinen stackattu modal story, suomeksi
    type ModalState = {
      id: number;
      isOpen: boolean;
      mode: 'single' | 'stacked-background' | 'stacked-foreground';
    };

    const [modals, setModals] = useState<ModalState[]>([]);

    const getAnimationMode = (
      index: number,
      openModals: ModalState[],
    ): 'single' | 'stacked-background' | 'stacked-foreground' => {
      if (openModals.length === 1) return 'single';
      const isTop = index === openModals.length - 1;
      return isTop ? 'stacked-foreground' : 'stacked-background';
    };

    const openNewModal = () => {
      setModals((prev) => {
        const newId = prev.length;
        const openModals = prev.filter((m) => m.isOpen);
        const updatedModals = prev.map((m) => (m.isOpen ? { ...m, mode: 'stacked-background' as const } : m));
        return [
          ...updatedModals,
          {
            id: newId,
            isOpen: true,
            mode: openModals.length === 0 ? 'single' : ('stacked-foreground' as const),
          },
        ];
      });
    };

    const closeModal = (id: number) => {
      setModals((prev) => {
        const modalIndex = prev.findIndex((m) => m.id === id);
        if (modalIndex === -1) return prev;
        const updated = prev.map((m, idx) => {
          if (idx === modalIndex) {
            return { ...m, isOpen: false };
          }
          return m;
        });
        const stillOpen = updated.filter((m) => m.isOpen);
        return updated.map((m) => {
          if (!m.isOpen) return m;
          const currentOpenIndex = stillOpen.findIndex((om) => om.id === m.id);
          return {
            ...m,
            mode: getAnimationMode(currentOpenIndex, stillOpen),
          };
        });
      });
    };

    const openModals = modals.filter((m) => m.isOpen);

    return (
      <>
        <div className="ds:space-y-4">
          <Button label={`Avaa uusi modal (${openModals.length} auki)`} onClick={openNewModal} />

          {openModals.length > 0 && (
            <div className="ds:text-sm ds:text-gray-600 ds:p-4 ds:bg-gray-100 ds:rounded">
              <p className="ds:font-semibold ds:mb-2">Avoinna olevat modalit:</p>
              <ul className="ds:list-disc ds:ml-6 ds:space-y-1">
                {openModals.map((m, idx) => (
                  <li key={m.id}>
                    Modal {m.id + 1} - <code>{m.mode}</code>
                    {idx === openModals.length - 1 && ' (päällimmäinen)'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {modals.map((modal) => {
          const isBottomModal = openModals.length > 0 && openModals[0].id === modal.id;
          const isTopModal = openModals.findIndex((m) => m.id === modal.id) === openModals.length - 1;
          return (
            <Modal
              key={modal.id}
              name={`Modal ${modal.id + 1}`}
              open={modal.isOpen}
              onClose={() => closeModal(modal.id)}
              animationMode={modal.mode}
              shouldRenderBackdrop={isBottomModal}
              content={
                <div className="ds:space-y-4">
                  <h2 className="ds:text-xl ds:font-bold">Modal {modal.id + 1}</h2>
                  <p>
                    <strong>Stack-positio:</strong> {openModals.findIndex((m) => m.id === modal.id) + 1}/
                    {openModals.length}
                  </p>
                  <p>
                    <strong>Animaatiomoodi:</strong> <code>{modal.mode}</code>
                  </p>

                  <div className="ds:border-t ds:pt-4 ds:mt-4">
                    <p className="ds:mb-3">
                      Voit avata uuden modalin tämän päälle tai sulkea tämän modalin. Kaikki taustamodalit ovat
                      'stacked-background' modessa, ja päällimmäinen on 'stacked-foreground' modessa.
                    </p>

                    {isTopModal && (
                      <Button
                        label={`Avaa modal ${modals.length + 1}`}
                        onClick={openNewModal}
                        variant="white"
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              }
              footer={
                <div className="ds:flex ds:gap-3 ds:justify-end">
                  <Button label="Sulje modal" onClick={() => closeModal(modal.id)} variant="accent" size="sm" />
                </div>
              }
            />
          );
        })}
      </>
    );
  },
  parameters: {
    design: commonDesignParams,
    docs: {
      description: {
        story:
          'Demonstrates multiple stacked modal animations. You can open as many modals as you want. All background modals are in stacked-background mode (scaled down and faded), while the topmost modal is in stacked-foreground mode. When closing a modal, the one below transitions to restoring-background mode.',
      },
    },
  },
  argTypes: { ...commonArgTypes },
  args: {
    ...commonArgs,
  },
};
