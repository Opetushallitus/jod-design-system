import type { StoryObj } from '@storybook/react-vite';

import { JodCompass, JodInfo } from '../../icons';
import type { TitledMeta } from '../../utils';
import { IconHeading } from './IconHeading';

const meta = {
  title: 'Content/IconHeading',
  component: IconHeading,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof IconHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

// Not as a component in Figma

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Component to show icon and heading',
      },
    },
  },
  args: {
    title: 'Etsi mahdollisuuksia',
    icon: <JodCompass />,
  },
};

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Long text',
      },
    },
  },
  args: {
    title: 'Tietosuojaseloste ja evästeet',
    icon: <JodInfo />,
  },
};
