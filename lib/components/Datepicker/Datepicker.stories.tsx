import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { useState } from '@storybook/preview-api';
import { DateView, DayTableCellState } from '@zag-js/date-picker';
import { Datepicker } from './Datepicker';

const meta = {
  title: 'Forms/Datepicker',
  component: Datepicker,
  tags: ['autodocs'],
} satisfies Meta<typeof Datepicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7791&t=dNDS0896ycg3WZwJ-4',
  },
};

const viewTranslations = {
  day: {
    next: 'Vaihda seuraavaan kuukauteen',
    view: 'Vaihda kuukausinäkymään',
    prev: 'Vaihda edelliseen kuukauteen',
  },
  month: {
    next: 'Vaihda seuraavaan vuoteen',
    view: 'Vaihda vuosinäkymään',
    prev: 'Vaihda edelliseen vuoteen',
  },
  year: {
    next: 'Vaihda seuraavaan vuosikymmeneen',
    view: 'Vaihda päivänäkymään',
    prev: 'Vaihda edelliseen vuosikymmeneen',
  },
} as const;

const translations = {
  nextTrigger: (view: DateView) => viewTranslations[view].next,
  viewTrigger: (view: DateView) => viewTranslations[view].view,
  prevTrigger: (view: DateView) => viewTranslations[view].prev,
  dayCell: (state: DayTableCellState): string => `Valitse ${state.formattedDate}`,
  trigger: (open: boolean): string => (open ? 'Sulje kalenteri' : 'Avaa kalenteri'),
};

const args = {
  label: 'Valitse päivämäärä',
  placeholder: 'pp.kk.vvvv',
  help: 'Help text',
  onChange: fn(),
  translations: translations,
};

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="ds:max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters,
  args,
};

export const WithValue: Story = {
  decorators: [
    (Story) => (
      <div className="ds:max-w-[415px]">
        <Story />
      </div>
    ),
  ],
  parameters,
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Datepicker {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    ...args,
    value: '2024-06-01',
  },
};
