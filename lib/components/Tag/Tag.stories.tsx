import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { fn } from 'storybook/test';
import { Tag } from './Tag';

const meta = {
  title: 'Content/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selectable: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6028',
    },
  },
  args: {
    label: 'selectable',
    onClick: fn(),
  },
};

export const Selected: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6042',
    },
  },
  args: {
    label: 'added',
    onClick: fn(),
    variant: 'added',
    sourceType: 'tyopaikka',
  },
};

export const Presentation: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6012&t=AyEPAtDzF6iKjlJw-4',
    },
  },
  args: {
    label: 'interesting',
    variant: 'presentation',
    sourceType: 'kiinnostus',
  },
};

export const Multiline: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '150px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6095',
    },
  },
  args: {
    label: 'this should not fit on one line',
    sourceType: 'rajoitus',
    variant: 'presentation',
  },
};

export const Tooltip: Story = {
  args: {
    label: 'This tag has a tooltip',
    tooltip: 'This is the tooltip text',
    sourceType: 'kiinnostus',
    variant: 'presentation',
  },
};

export const SelectableWithTooltipNoClickToggle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Clickable tag with tooltip: click performs the tag action only; tooltip opens via hover/focus (no click toggle).',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6028',
    },
  },
  args: {
    label: 'selectable',
    tooltip: 'This is the tooltip text',
    onClick: fn(),
    sourceType: 'kiinnostus',
    variant: 'selectable',
  },
};
