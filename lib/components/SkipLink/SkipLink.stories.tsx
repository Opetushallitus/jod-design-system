import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';
import { SkipLink } from './SkipLink';

const meta = {
  title: 'Navigation/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof SkipLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Skip link is only visible when getting focus.',
      },
    },
  },
  args: {
    label: 'Skip to main content',
    hash: '#',
  },
};
