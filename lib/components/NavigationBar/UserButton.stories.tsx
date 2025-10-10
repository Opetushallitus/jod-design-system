import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { fn } from 'storybook/test';
import { UserButton, UserButtonProps } from './UserButton';

const meta = {
  title: 'Navigation/UserButton',
  component: UserButton,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof UserButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: UserButtonProps = {
  serviceVariant: 'yksilo',
  firstName: 'Henrik-Petteri',
  isProfileActive: false,
  profileLabel: 'Osaamisprofiilini',
  profileLinkComponent: ({ children, className, ...rest }) => (
    <a href="/#" className={className} {...rest}>
      {children}
    </a>
  ),
  isLoggedIn: true,
  loginLabel: 'Kirjaudu',
  loginLinkComponent: ({ children, className, ...rest }) => (
    <a href="/#" className={className} {...rest}>
      {children}
    </a>
  ),
  logoutLabel: 'Kirjaudu ulos',
  onLogout: fn(),
};

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14130-48895',
    },
    docs: {
      description: {
        story: 'Component for showing user menu.',
      },
    },
  },
  args: {
    ...defaultProps,
  },
  decorators: [
    (Story) => (
      <div className="ds:flex ds:item-center ds:justify-center ds:h-[250px]">
        <Story />
      </div>
    ),
  ],
};

export const UserInProfile: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14130-48895',
    },
    docs: {
      description: {
        story: 'User is in the profile page; show it in the menu',
      },
    },
  },
  args: {
    ...defaultProps,
    isProfileActive: true,
  },
  decorators: [
    (Story) => (
      <div className="ds:flex ds:item-center ds:justify-center ds:h-[250px]">
        <Story />
      </div>
    ),
  ],
};
