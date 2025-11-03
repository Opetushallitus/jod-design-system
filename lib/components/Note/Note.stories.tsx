import type { StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';

import { Note } from '.';
import { JodOpenInNew } from '../../icons';
import { Button } from '../Button/Button';

const meta = {
  title: 'Popups/Note',
  component: Note,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['readMoreComponent', 'onCloseClick'],
    },
  },
  globals: {
    viewport: { value: 'fullwidth' },
  },
} satisfies TitledMeta<typeof Note>;

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

const readMoreComponent = <Button variant="plain" label="Lue lisää" className="ds:text-primary-gray!" />;

export const ConfirmationNote: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69983',
    },
    docs: {
      description: {
        story: 'This is a success note component for displaying a text.',
      },
    },
  },
  args: {
    title,
    description,
    readMoreComponent,
    variant: 'success',
    onCloseClick: fn(),
  },
};

export const LongTitleText: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-69983',
    },
    docs: {
      description: {
        story: 'This is a success note component for displaying a long title text.',
      },
    },
  },
  args: {
    title: 'Lorem ipsum dolor est nonummy noblem ester!',
    description,
    readMoreComponent,
    variant: 'success',
    onCloseClick: fn(),
  },
};

export const PermanentNote: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-70141',
    },
    docs: {
      description: {
        story: 'This is a error note component for displaying a permanent note.',
      },
    },
  },
  args: {
    title,
    description,
    variant: 'error',
    permanent: true,
  },
};

export const NoCTA: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-70049',
    },
    docs: {
      description: {
        story: 'This is a success note component without a call to action.',
      },
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
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-70005',
    },
    docs: {
      description: {
        story: 'This is a warning note component for displaying a text.',
      },
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
        story: 'This is a warning note component for displaying a text.',
      },
    },
  },
  args: {
    title,
    description,
    variant: 'error',
  },
};

export const feedback: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-70080',
    },
    docs: {
      description: {
        story: 'This is a feedback note component for displaying a text.',
      },
    },
  },
  args: {
    title: 'Kokeile palvelua',
    description: 'Kerro mielipiteesi ja auta meitä kehittämään palvelua.',
    variant: 'feedback',
    readMoreComponent: (
      <Button
        variant="white"
        label="Siirry kyselyyn"
        icon={<JodOpenInNew ariaLabel="Linkki johtaa palvelun ulkopuolelle" />}
        iconSide="right"
        size="sm"
      />
    ),
    onCloseClick: fn(),
  },
};
