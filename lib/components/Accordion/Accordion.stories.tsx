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
    children:
      'Ex duis minim eu qui. Labore labore quis mollit aliqua duis tempor nisi non fugiat ipsum est duis esse. Proident reprehenderit irure irure sunt do. Magna exercitation veniam mollit duis nisi ipsum do.',
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

export const NoEllipsis: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Accordion with ellipsis disabled for long titles.',
      },
    },
  },
  args: {
    title:
      'This is a very long title that should not be truncated with ellipsis even if it exceeds the container width',
    children: 'Content',
    caretPosition: 'top',
    ellipsis: false,
  },
};

export const Nested: Story = {
  render: (args) => {
    return (
      <Accordion {...args} initialState={false}>
        <div className="ds:pl-5">
          <p className="ds:p-5">Level 1</p>
          <Accordion {...args} title="Nested Accordion title" initialState={false}>
            <div className="ds:pl-5">
              <p className="ds:p-5">Level 2</p>
              <Accordion {...args} title="Another nested Accordion title" initialState={false}>
                <div className="ds:pl-5">
                  <p className="ds:p-5">Level 3</p>
                </div>
              </Accordion>
            </div>
          </Accordion>
        </div>
      </Accordion>
    );
  },
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Nested Accordion structure.',
      },
    },
  },
  args: {
    title: 'Accordion title',
    children: '',
    underline: true,
    caretPosition: 'top',
    ellipsis: false,
  },
};
