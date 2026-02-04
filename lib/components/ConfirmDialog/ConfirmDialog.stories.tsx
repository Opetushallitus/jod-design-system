import type { StoryObj } from '@storybook/react-vite';
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
        <div className="ds:flex ds:flex-shrink-0 ds:bg-bg-gray-2 ds:overflow-x-auto ds:overflow-y-hidden ds:justify-between ds:z-50 ds:gap-3">
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
      "I'm baby vice cupping salvia hella activated charcoal yuccie selvage twee la croix. PBR&B bruh gentrify, sartorial forage viral succulents craft beer trust fund cornhole. Chartreuse tonx tumeric, pour-over messenger bag next level gluten-free sus cronut gochujang gastropub hashtag. Crucifix vibecession man bun mlkshk vape. Cray mumblecore neutra ascot, bodega boys blog PBR&B tumblr woke kogi venmo. Bespoke pour-over chambray echo park meditation crucifix PBR&B yr 8-bit sustainable fanny pack green juice cray stumptown. Schlitz tofu celiac try-hard palo santo pickled big mood. Cliche tote bag food truck, affogato godard roof party next level succulents. Dreamcatcher roof party distillery literally vinyl succulents XOXO microdosing. PBR&B fanny pack hexagon vexillologist solarpunk. Brunch raw denim vexillologist meggings, kale chips sriracha man bun chillwave. Plaid vexillologist fanny pack, kitsch chambray same next level mukbang PBR&B meditation. La croix deep v skateboard tumblr fixie shoreditch. Mustache humblebrag put a bird on it beard forage, paleo health goth brunch DSA dreamcatcher vinyl unicorn. Tumeric jawn hell of iceland flexitarian chartreuse lumbersexual butcher adaptogen heirloom offal humblebrag. Franzen sartorial enamel pin, butcher tattooed irony food truck cold-pressed tousled chia narwhal tilde vaporware tumeric. Subway tile scenester coloring book, flannel portland bushwick readymade hoodie.",
  },
};
