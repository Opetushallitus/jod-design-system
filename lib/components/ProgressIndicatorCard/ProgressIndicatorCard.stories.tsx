import type { StoryObj } from '@storybook/react-vite';

import type { TitledMeta } from '../../storybook';
import { ProgressIndicatorCard } from './ProgressIndicatorCard';

const meta = {
  title: 'Cards/ProgressIndicatorCard',
  component: ProgressIndicatorCard,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof ProgressIndicatorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=3857-2323',
    },
    docs: {
      description: {
        story:
          'Showing the progress indicator card. `label` is read by screen readers. The card is rendered only while loading, so its status may not be announced on every screen reader; for a reliable announcement, the page should also have a persistent `role="status"` region.',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    label: 'Ladataan tuloksia',
  },
};
