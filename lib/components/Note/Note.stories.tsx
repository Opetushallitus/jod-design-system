import type { StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';

import { Note, NoteStack, NoteStackProvider, useNoteStack } from '.';
import { JodOpenInNew } from '../../icons';
import { Button } from '../Button/Button';
import { NoteProps } from './Note';

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
    ariaClose: 'Close',
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
    ariaClose: 'Close',
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
    ariaClose: 'Close',
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
    ariaClose: 'Close',
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
    ariaClose: 'Close',
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
    ariaClose: 'Close',
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
    ariaClose: 'Close',
  },
};

export const WithNoteStack: Story = {
  decorators: [
    (Story) => (
      <div className="ds:h-[400px] ds:overflow-y-auto">
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const NoteStackDemo = () => {
      const { addNote, removeNote, notes } = useNoteStack();
      const variants = ['success', 'error', 'warning', 'feedback'] as NoteProps['variant'][];
      return (
        <div className="ds:flex ds:flex-col ds:gap-5 ds:relative">
          <div className="ds:fixed ds:top-0 ds:w-full">
            <NoteStack showAllText="Näytä kaikki" />
          </div>
          <div className="ds:mt-[200px] ds:flex ds:gap-5 ds:justify-center">
            {variants.map((variant) => (
              <Button
                key={variant}
                variant="accent"
                size="sm"
                label={variant!}
                className="ds:capitalize"
                onClick={() => addNote({ ...args, variant, title: variant?.toLocaleUpperCase() })}
              />
            ))}
            <Button
              variant="accent"
              size="sm"
              label="Permanent"
              onClick={() => addNote({ ...args, variant: 'error', title: 'PERMANENT', permanent: true })}
            />
            <Button
              variant="red-delete"
              size="sm"
              label="Clear"
              onClick={() => notes.forEach((n) => removeNote(n.id))}
            />
          </div>
        </div>
      );
    };

    return (
      <NoteStackProvider>
        <NoteStackDemo />
      </NoteStackProvider>
    );
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14337-67043',
    },
    docs: {
      description: {
        story:
          'Notes inside a stack component. The stack uses a hook to manage the notes. Notes are sorted by variant and permanent status. When user scrolls the page down, all notes besides permanent ones will collapse. Notes uncollapse when scrolling up. You can add and clear notes by using the provided buttons.',
      },
    },
  },
  args: {
    description,
    ariaClose: 'Close',
  },
};
