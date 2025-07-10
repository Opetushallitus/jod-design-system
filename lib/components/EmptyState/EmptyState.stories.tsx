import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { EmptyState } from './EmptyState';

const meta = {
  title: 'Content/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14270-57801',
    },
    docs: {
      description: {
        story: 'This is an empty state component, good for displaying when there is no data available.',
      },
    },
  },
  args: {
    text: 'Ei suosikkeja. Lisää työ- tai koulutusmahdollisuuksia suosikeiksi.',
  },
};
