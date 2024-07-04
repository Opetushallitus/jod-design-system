import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ConfirmDialog } from './ConfirmDialog';

const meta = {
  title: 'ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  return (
    <ConfirmDialog {...args}>
      {(showDialog) => <button onClick={showDialog}>Open ConfirmDialog example</button>}
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
  <div className="flex items-center rounded-[10px] border-[5px] border-secondary-1 px-[108px] py-[22px] text-center text-secondary-1">
    Raahaa kuva tähän tai klikkaa aluetta valitaksesi kuva tietokoneeltasi.
  </div>
);

export const WithContent: Story = {
  render,
  parameters,
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
      className="group flex select-none items-center gap-4 rounded-[30px] bg-white px-6 text-button-md text-black hover:text-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1.5px] focus-visible:outline-accent active:bg-accent active:text-white active:outline-0"
      onClick={onClick}
    >
      <span className="py-[10px] group-hover:underline group-focus-visible:no-underline group-active:no-underline">
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
        <div className="flex flex-row justify-between gap-5">
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
      {(showDialog) => <button onClick={showDialog}>Open ConfirmDialog example</button>}
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
      'Lorem ipsum dolor sit amet, no vis verear commodo. Vix quot dicta phaedrum ad. Has eu invenire concludaturque, simul accusata no ius.',
  },
};
