import type { Meta, StoryObj } from '@storybook/react';

import { NavigationBar, type NavigationBarProps } from './NavigationBar';

const meta = {
  component: NavigationBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/TpFgprt8pjcFcrHlMuL8Ry/cx_jod_ui?node-id=42%3A3498',
  },
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'desktop',
  },
};

const items: NavigationBarProps['items'] = [
  {
    text: 'Yksilöille',
    active: true,
    component: ({ children, ...rootProps }) => (
      <a href="/yksiloille" {...rootProps}>
        {children}
      </a>
    ),
  },
  {
    text: 'Ohjaajille',
    active: false,
    component: ({ children, ...rootProps }) => (
      <a href="/ohjaajille" {...rootProps}>
        {children}
      </a>
    ),
  },
  {
    text: 'Kouluttajille',
    active: false,
    component: ({ children, ...rootProps }) => (
      <a href="/kouluttajille" {...rootProps}>
        {children}
      </a>
    ),
  },
  {
    text: 'Viranomaisille',
    active: false,
    component: ({ children, ...rootProps }) => (
      <a href="/viranomaisille" {...rootProps}>
        {children}
      </a>
    ),
  },
];

const user: NavigationBarProps['user'] = {
  name: 'Jane Doe',
  src: 'https://i.pravatar.cc/200?img=24',
  component: ({ children, ...rootProps }) => (
    <a href="/profiili" aria-label="Profiili" {...rootProps}>
      {children}
    </a>
  ),
};

const args: NavigationBarProps = {
  items,
  user,
};

export const Default: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'This story demonstrates how the navigation bar looks with navigation items and an avatar.',
      },
    },
  },
  args,
};

export const Plain: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'This story demonstrates how the navigation bar looks without any items or an avatar.',
      },
    },
  },
  args: {},
};

export const Items: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'This story demonstrates how the navigation bar looks with navigation items.',
      },
    },
  },
  args: {
    items,
  },
};

export const Avatar: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'This story demonstrates how the navigation bar looks with an avatar.',
      },
    },
  },
  args: {
    user,
  },
};

export const Sticky: Story = {
  decorators: [
    (Story) => (
      <div>
        <header className="sticky top-0">
          <Story />
        </header>
        <main>
          {[...Array<undefined>(20)].map((_p, index) => (
            <p key={index} className="p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          ))}
        </main>
      </div>
    ),
  ],
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'This story demonstrates how the navigation bar behaves when it is sticky.',
      },
      story: {
        inline: false,
        iframeHeight: 400,
      },
      source: {
        code: '<header className="sticky top-0">\n  <NavigationBar />\n</header>',
      },
    },
  },
  args,
};
