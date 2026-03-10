import type { StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';

import { ConfirmDialog } from './ConfirmDialog';

const meta = {
  title: 'Popups/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  return (
    <ConfirmDialog {...args}>
      {(showDialog) => (
        <button onClick={showDialog} className="ds:cursor-pointer">
          Open ConfirmDialog example
        </button>
      )}
    </ConfirmDialog>
  );
};

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7677&t=b8o6NAta57e3aj8E-1',
  },
};

export const Normal: Story = {
  render,
  parameters,
  args: {
    children: () => <></>,
    title: 'Haluatko kirjautua ulos?',
    description: 'Et voi enää nähdä tiettyjä tietoja, kuten henkilökohtaisia tietoja, kun olet kirjautunut ulos.',
    onConfirm: fn(),
    confirmText: 'Kyllä',
    cancelText: 'Peruuta',
  },
};

const Content = () => (
  <div className="ds:flex ds:items-center ds:rounded-[10px] ds:border-[5px] ds:border-secondary-1 ds:px-[108px] ds:py-[22px] ds:text-center ds:text-secondary-1">
    Raahaa kuva tähän tai klikkaa aluetta valitaksesi kuva tietokoneeltasi.
  </div>
);

export const WithContent: Story = {
  render,
  parameters,
  argTypes: {
    content: {
      control: false,
    },
  },
  args: {
    children: () => <></>,
    title: 'Lisää avatar-kuva',
    description: 'Lisää avatar-kuva, joka näkyy profiilissasi.',
    content: <Content />,
    onConfirm: fn(),
    confirmText: 'Lisää',
    cancelText: 'Peruuta',
  },
};

export const Destructive: Story = {
  render,
  parameters,
  args: {
    children: () => <></>,
    title: 'Haluatko poistaa suosikin?',
    description:
      'Lorem ipsum dolor sit amet, no vis verear commodo. Vix quot dicta phaedrum ad. Has eu invenire concludaturque, simul accusata no ius.',
    onConfirm: fn(),
    confirmText: 'Kyllä',
    variant: 'destructive',
    cancelText: 'Peruuta',
  },
};

const Button = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <button
      className="ds:cursor-pointer ds:group ds:flex ds:select-none ds:items-center ds:gap-4 ds:rounded-[30px] ds:bg-white ds:px-6 ds:text-button-md ds:text-primary-gray ds:hover:text-accent ds:focus-visible:text-accent ds:focus-visible:outline-[3px] ds:focus-visible:outline-offset-[1.5px] ds:focus-visible:outline-accent ds:active:bg-accent ds:active:text-white ds:active:outline-0"
      onClick={onClick}
    >
      <span className="ds:py-[10px] ds:group-hover:underline ds:group-focus-visible:no-underline ds:group-active:no-underline">
        {label}
      </span>
    </button>
  );
};

const renderFooter = (args: Story['args']) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onConfirm, confirmText, variant, cancelText, ...rest } = args;
  return (
    <ConfirmDialog
      {...rest}
      footer={(hideDialog) => (
        <div className="ds:flex ds:shrink-0 ds:bg-bg-gray-2 ds:overflow-x-auto ds:overflow-y-hidden ds:justify-between ds:gap-3">
          <Button onClick={hideDialog} label="En" />
          <Button
            onClick={() => {
              fn();
              hideDialog();
            }}
            label="Kyllä"
          />
        </div>
      )}
    >
      {(showDialog) => (
        <button onClick={showDialog} className="ds:cursor-pointer">
          Open ConfirmDialog example
        </button>
      )}
    </ConfirmDialog>
  );
};

export const WithFooter: Story = {
  render: renderFooter,
  parameters,
  args: {
    children: () => <></>,
    footer: () => <></>,
    title: 'Haluatko kokeilla uutta ominaisuutta?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sodales vestibulum ligula, sed venenatis diam tempus eget. Quisque fringilla velit nisl, et dictum ligula rutrum ut. Cras vel augue vehicula, laoreet enim in, malesuada odio. Phasellus malesuada placerat ex. Sed gravida neque in nibh ultrices, vitae iaculis sem pretium. Sed eu mattis lorem. Sed condimentum sit amet ante quis semper. Etiam placerat nunc at velit iaculis, id lobortis risus ultricies. Quisque convallis luctus velit, quis condimentum augue pellentesque ut. Fusce nulla velit, placerat et ultricies non, tincidunt a libero. Suspendisse efficitur nulla sit amet eros aliquam ultrices. Proin id semper tellus, at suscipit orci. Cras non maximus sem. Fusce vitae volutpat nulla. Nunc ultrices mi ut sem bibendum, ac vehicula nibh porttitor. Sed nec porttitor dolor. Donec imperdiet scelerisque sapien non imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis iaculis augue, iaculis commodo justo. Quisque interdum erat nec eros iaculis, non congue lectus viverra. Donec iaculis nunc leo. Morbi dapibus magna nibh, euismod elementum nisi facilisis at. Quisque auctor vehicula nulla porta auctor. Sed nec iaculis nulla, ac laoreet augue. Nunc in feugiat ex. Cras quis lorem vitae enim laoreet posuere. Donec a mauris ante. In vehicula sapien a volutpat tristique. Nulla facilisi. Phasellus sed fringilla dolor. Vivamus sit amet ipsum ac urna interdum hendrerit. Suspendisse potenti. Integer at suscipit neque. Cras elementum, quam a pellentesque iaculis, orci justo consectetur turpis, sed lacinia nunc mi non massa. Ut sed massa non enim euismod fringilla. Fusce fringilla erat augue, nec varius nisi viverra in. Nullam vel interdum tellus, a tristique justo. Ut tempus arcu nec augue condimentum, at facilisis enim gravida. Maecenas in bibendum justo. Proin id libero rutrum lacus consequat cursus eu sit amet leo. Donec euismod nibh eu rhoncus auctor. Mauris interdum neque in orci mollis eleifend. Maecenas a quam felis. Proin mattis rutrum dictum. Nam lacinia lectus eget efficitur accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dictum, leo in tempor lobortis, elit massa semper felis, in congue lorem arcu ac ante. Nunc aliquam suscipit ex ut commodo. Sed vitae accumsan odio, eu tempor nisi. Vestibulum fermentum pulvinar dolor, quis tempor libero. Quisque urna libero, sagittis non egestas ut, hendrerit id lectus. Nunc condimentum tortor nec tortor porttitor imperdiet. Donec vitae turpis mi. Duis enim turpis, vestibulum nec augue vel, elementum hendrerit metus. Sed eget sapien non sapien ullamcorper sagittis.',
  },
};

export const MultipleStackedDialogs: Story = {
  render: () => {
    type DialogState = {
      id: number;
      isOpen: boolean;
      mode: 'single' | 'stacked-background' | 'stacked-foreground';
    };

    const [dialogs, setDialogs] = useState<DialogState[]>([]);
    const dialogRefs = useRef<Map<number, () => void>>(new Map());
    const openedDialogsRef = useRef<Set<number>>(new Set());

    const getAnimationMode = (
      index: number,
      openDialogs: DialogState[],
    ): 'single' | 'stacked-background' | 'stacked-foreground' => {
      if (openDialogs.length === 1) return 'single';
      const isTop = index === openDialogs.length - 1;
      return isTop ? 'stacked-foreground' : 'stacked-background';
    };

    useEffect(() => {
      const openDialogs = dialogs.filter((d) => d.isOpen);
      openDialogs.forEach((dialog) => {
        if (!openedDialogsRef.current.has(dialog.id)) {
          const showFn = dialogRefs.current.get(dialog.id);
          if (showFn) {
            showFn();
            openedDialogsRef.current.add(dialog.id);
          }
        }
      });
      const openIds = new Set(openDialogs.map((d) => d.id));
      openedDialogsRef.current.forEach((id) => {
        if (!openIds.has(id)) {
          openedDialogsRef.current.delete(id);
        }
      });
    }, [dialogs]);

    const openNewDialog = () => {
      setDialogs((prev) => {
        const newId = prev.length;
        const openDialogs = prev.filter((d) => d.isOpen);
        const updatedDialogs = prev.map((d) => (d.isOpen ? { ...d, mode: 'stacked-background' as const } : d));
        return [
          ...updatedDialogs,
          {
            id: newId,
            isOpen: true,
            mode: openDialogs.length === 0 ? 'single' : ('stacked-foreground' as const),
          },
        ];
      });
    };

    const updateDialogModes = (updated: DialogState[], stillOpen: DialogState[]) => {
      return updated.map((d) => {
        if (!d.isOpen) return d;
        const currentOpenIndex = stillOpen.findIndex((od) => od.id === d.id);
        return {
          ...d,
          mode: getAnimationMode(currentOpenIndex, stillOpen),
        };
      });
    };

    const closeDialog = (id: number) => {
      setDialogs((prev) => {
        const dialogIndex = prev.findIndex((d) => d.id === id);
        if (dialogIndex === -1) return prev;
        const updated = prev.map((d, idx) => {
          if (idx === dialogIndex) {
            return { ...d, isOpen: false };
          }
          return d;
        });
        const stillOpen = updated.filter((d) => d.isOpen);
        return updateDialogModes(updated, stillOpen);
      });
    };

    const openDialogs = dialogs.filter((d) => d.isOpen);

    return (
      <>
        <div className="ds:space-y-4">
          <button onClick={openNewDialog} className="ds:cursor-pointer ds:p-3 ds:bg-accent ds:text-white ds:rounded">
            Avaa uusi dialogi ({openDialogs.length} auki)
          </button>

          {openDialogs.length > 0 && (
            <div className="ds:text-sm ds:text-gray-600">
              <p>Avoinna olevat dialogit:</p>
              <ul className="ds:list-disc ds:ml-6">
                {openDialogs.map((d, idx) => (
                  <li key={d.id}>
                    Dialogi {d.id + 1} - {d.mode} {idx === openDialogs.length - 1 && '(päällimmäinen)'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {dialogs.map((dialog) => {
          const isBottomDialog = openDialogs.length > 0 && openDialogs[0].id === dialog.id;
          const isTopDialog = openDialogs.findIndex((d) => d.id === dialog.id) === openDialogs.length - 1;
          return (
            <ConfirmDialog
              key={dialog.id}
              title={`Dialogi ${dialog.id + 1}`}
              description={`Tämä on dialogi numero ${dialog.id + 1}. Stack-positio: ${openDialogs.findIndex((d) => d.id === dialog.id) + 1}/${openDialogs.length}`}
              content={
                <div className="ds:mt-4 ds:space-y-4">
                  <p>
                    <strong>Animaatiomoodi:</strong> {dialog.mode}
                  </p>
                  <p>
                    Voit avata uuden dialogin tämän päälle klikkaamalla alla olevaa painiketta, tai sulkea tämän
                    dialogin.
                  </p>
                  {isTopDialog && (
                    <button
                      onClick={openNewDialog}
                      className="ds:cursor-pointer ds:p-3 ds:bg-accent ds:text-white ds:w-full ds:rounded"
                    >
                      Avaa dialogi {dialogs.length + 1}
                    </button>
                  )}
                </div>
              }
              animationMode={dialog.mode}
              shouldRenderBackdrop={isBottomDialog}
              onConfirm={() => {
                fn();
                closeDialog(dialog.id);
              }}
              onClose={() => closeDialog(dialog.id)}
              confirmText="Vahvista"
              cancelText="Sulje"
            >
              {(showDialog) => {
                dialogRefs.current.set(dialog.id, showDialog);
                return <></>;
              }}
            </ConfirmDialog>
          );
        })}
      </>
    );
  },
  parameters,
  args: {
    children: () => <></>,
    title: '',
    description: '',
    onConfirm: fn(),
    confirmText: '',
    cancelText: '',
  },
};
