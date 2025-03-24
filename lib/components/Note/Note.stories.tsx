import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Note } from './Note';

const meta = {
  title: 'Snackbar/Note',
  component: Note,
  tags: ['autodocs'],
} satisfies Meta<typeof Note>;

export default meta;

type Story = StoryObj<typeof meta>;

const title = 'Lorem ipsum';
const description = 'Ipsum dolor est nonummy sit amet accusata mediocre me tulsa opus.';

// Add some bottom padding to stories so that the "Show code" button doesn't cover the content
const decorators: Story['decorators'] = [
  (Story) => (
    <div className="ds:pb-[25px]">
      <Story />
    </div>
  ),
];

export const ConfirmationNote: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8714&t=XinajcpkjOyuElVJ-1',
    },
    docs: {
      description: {
        story: 'This is a success toast component for displaying a text.',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    title,
    description,
    readMoreComponent: <>Lue lisää</>,
    onCloseClick: fn(),
  },
};

export const LongTitleText: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8803&t=XinajcpkjOyuElVJ-4',
    },
    docs: {
      description: {
        story: 'This is a success toast component for displaying a long title text.',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    title: 'Lorem ipsum dolor est nonummy noblem ester!',
    description,
    readMoreComponent: <>Lue lisää</>,
    onCloseClick: fn(),
  },
};

export const PermanentNote: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8725&t=XinajcpkjOyuElVJ-4',
    },
    docs: {
      description: {
        story: 'This is a success toast component for displaying a permanent note.',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    title,
    description,
    readMoreComponent: <>Lue lisää</>,
  },
};

export const NoCTA: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8762&t=XinajcpkjOyuElVJ-4',
    },
    docs: {
      description: {
        story: 'This is a success toast component for displaying a permanent note.',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    title,
    description,
    onCloseClick: fn(),
  },
};

export const WarningNote: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8790&t=XinajcpkjOyuElVJ-4',
    },
    docs: {
      description: {
        story: 'This is a warning toast component for displaying a text.',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    title,
    description,
    variant: 'warning',
  },
};

export const ErrorNote: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8777&t=XinajcpkjOyuElVJ-4',
    },
    docs: {
      description: {
        story: 'This is a warning toast component for displaying a text.',
      },
    },
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    title,
    description,
    variant: 'error',
  },
};
