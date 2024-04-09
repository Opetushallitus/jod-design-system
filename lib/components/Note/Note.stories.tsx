import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Note } from './Note';

const meta = {
  title: 'Snackbars/Note',
  component: Note,
  tags: ['autodocs'],
} satisfies Meta<typeof Note>;

export default meta;

type Story = StoryObj<typeof meta>;

const title = 'Lorem ipsum';
const description = 'Ipsum dolor est nonummy sit amet accusata mediocre me tulsa opus.';

export const ConfirmationNote: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8296',
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
    readMoreText: 'Lue lisää',
    readMoreHref: '/',
    onCloseClick: fn(),
  },
};

export const LongTitleText: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8357',
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
    readMoreText: 'Lue lisää',
    readMoreHref: '/',
    onCloseClick: fn(),
  },
};

export const PermanentNote: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8278',
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
    readMoreText: 'Lue lisää',
    readMoreHref: '/',
  },
};

export const NoCTA: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8316',
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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8344',
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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A8331',
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
