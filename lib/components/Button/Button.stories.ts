import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const backgrounds = {
  default: 'jod-bg-gray',
  values: [{ name: 'jod-bg-gray', value: '#f5f5f5' }],
};

export const Gray: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729%3A8122',
    },
    docs: {
      description: {
        story: 'This is a gray button component for triggering an action.',
      },
    },
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    variant: 'gray',
  },
};

export const White: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729%3A8086',
    },
    docs: {
      description: {
        story: 'This is a white button component for triggering an action.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    variant: 'white',
  },
};

export const GrayDelete: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=842%3A7302',
    },
    docs: {
      description: {
        story: 'This is a gray delete button component for triggering an action.',
      },
    },
  },
  args: {
    label: 'Poista',
    onClick: fn(),
    variant: 'gray-delete',
  },
};

export const WhiteDelete: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=842%3A7301',
    },
    docs: {
      description: {
        story: 'This is a white delete button component for triggering an action.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Poista',
    onClick: fn(),
    variant: 'white-delete',
  },
};

export const Disabled: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729%3A8077',
    },
    docs: {
      description: {
        story: 'This is a disabled button component.',
      },
    },
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    disabled: true,
  },
};

export const Small: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729%3A8122',
    },
    docs: {
      description: {
        story: 'This is a small button component.',
      },
    },
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    size: 'sm',
  },
};

export const Large: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729%3A8106',
    },
    docs: {
      description: {
        story: 'This is a large button component.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Muokkaa',
    onClick: fn(),
    size: 'lg',
    variant: 'white',
  },
};

export const MediumWithLeftIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729%3A8088',
    },
    docs: {
      description: {
        story: 'This is a medium button component with an left icon.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Takaisin',
    onClick: fn(),
    variant: 'white',
    icon: 'arrow_back',
  },
};

export const LargeWithRightIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=729%3A8102',
    },
    docs: {
      description: {
        story: 'This is a large button component with an right icon.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Kokeile palvelua',
    onClick: fn(),
    size: 'lg',
    variant: 'white',
    icon: 'arrow_forward',
    iconSide: 'right',
  },
};
