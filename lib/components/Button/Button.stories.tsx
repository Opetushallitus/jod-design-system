import type { StoryObj } from '@storybook/react-vite';
import { MdArrowBack, MdArrowForward, MdPerson } from 'react-icons/md';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';

import { Button } from './Button';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const backgrounds = {
  default: 'jod-bg-white',
  values: [{ name: 'jod-bg-white', value: '#fff' }],
};

export const Gray: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5869&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a gray button component for triggering an action.',
      },
    },
    backgrounds,
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
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5829&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a white button component for triggering an action.',
      },
    },
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
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5850&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a gray delete button component for triggering an action.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Poista',
    onClick: fn(),
    variant: 'gray-delete',
  },
};
export const RedDelete: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5850&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a red delete button component for triggering an action.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Poista',
    onClick: fn(),
    variant: 'red-delete',
  },
};

export const WhiteDelete: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5847&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a white delete button component for triggering an action.',
      },
    },
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
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5809&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a disabled button component.',
      },
    },
    backgrounds,
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
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5831&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a small button component.',
      },
    },
    backgrounds,
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
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5857&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a large button component.',
      },
    },
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
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5837&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a medium button component with an left icon.',
      },
    },
  },
  args: {
    label: 'Takaisin',
    onClick: fn(),
    variant: 'white',
    icon: <MdArrowBack size={24} />,
  },
};

export const LargeWithRightIcon: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5853&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a large button component with an right icon.',
      },
    },
  },
  args: {
    label: 'Kokeile palvelua',
    onClick: fn(),
    size: 'lg',
    variant: 'white',
    icon: <MdArrowForward size={40} />,
    iconSide: 'right',
  },
};

export const AsLink: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-5869&t=6CqIVQA2gz0PPxiK-4',
    },
    docs: {
      description: {
        story: 'This is a link component that resembles the button component.',
      },
    },
    backgrounds,
  },
  args: {
    label: 'Kirjaudu sisään',
    size: 'lg',
    variant: 'gray',
    icon: <MdPerson size={40} />,
    iconSide: 'left',
    LinkComponent: ({ children }: { children: React.ReactNode }) => <a href="/#">{children}</a>,
  },
};
