import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';
import { Accordion } from './Accordion';

const meta = {
  title: 'Content/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

// Decorator for preventing the preview size change when the content is toggled
const decorators: Story['decorators'] = [
  (Story) => (
    <div className="ds:min-h-[80px]">
      <Story />
    </div>
  ),
];

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-6882',
  },
};

export const Default: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion component for hiding content.',
      },
    },
  },
  args: {
    title: 'Title',
    children: 'Content',
  },
};

export const TitleComponent: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion component with a custom component as a title.',
      },
    },
  },
  argTypes: {
    title: {
      control: false,
    },
  },
  args: {
    title: <div className="ds:text-heading-1 ds:font-arial ds:text-alert ds:italic ds:tracking-widest">Title</div>,
    ariaLabel: 'Title',
    children: 'Content',
  },
};

export const WithUnderline: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion component with underlined title.',
      },
    },
  },
  args: {
    title: 'Title',
    children: 'Content',
    underline: true,
  },
};

export const WithAsync: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion component that shows a loading spinner while fetching data asynchronously.',
      },
    },
  },
  args: {
    title: 'Title',
    children: 'Content',
    underline: true,
    initialState: false,
    fetchData: async () => new Promise((resolve) => setTimeout(resolve, 5000)),
  },
};

export const GrayClosedByDefault: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion that is closed by default and is gray variant',
      },
    },
  },
  args: {
    title: 'Title',
    children: <div className="ds:bg-bg-gray-2 ds:px-5 ds:pb-3">{'Content'}</div>,
    initialState: false,
    className: 'ds:bg-bg-gray-2 ds:p-3',
  },
};

export const CollapsedContent: Story = {
  decorators,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=18476-74978',
    },
    docs: {
      description: {
        story: 'Accordion that has content to show when collapsed',
      },
    },
  },
  args: {
    title: 'Accordion title',
    children: 'Accordion expanded content',
    collapsedContent: <div className="ds:text-md ds:text-primary-gray ds:mt-5">Collapsed content</div>,
  },
};
