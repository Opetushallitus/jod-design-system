import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';

import { Spinner } from './Spinner';

const meta = {
  title: 'Misc/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="ds:min-h-11 ds:p-6 ds:py-11">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=3843-2314&t=T6poglSTmYanGA82-4',
    },
    docs: {
      description: {
        story: 'Loading spinner',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    size: 64,
    color: 'accent',
  },
};
