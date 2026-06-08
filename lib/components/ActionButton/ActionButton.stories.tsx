import type { StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { JodPrint } from '../../icons';
import type { TitledMeta } from '../../utils';
import { ActionButton } from './ActionButton';

const meta = {
  title: 'Buttons/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof ActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dgMOsST06t4TvDcBA9lcki/Osaamispolku-_-Design-system?node-id=660-3367',
    },
  },
  args: {
    label: 'Tulosta',
    icon: <JodPrint className="ds:text-accent" />,
    onClick: fn(),
    className: 'ds:bg-bg-gray-2',
  },
};
