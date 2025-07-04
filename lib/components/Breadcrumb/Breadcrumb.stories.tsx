import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/a3heEFNpoI9MRcMFtbYVfO/Osaamispolku---Design-system?node-id=356-2883',
  },
};

export const Default: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Breadcrumb component for navigation.',
      },
    },
  },
  argTypes: {
    serviceVariant: {
      control: { type: 'radio' },
      options: ['yksilo', 'ohjaaja', 'tietopalvelu', 'palveluportaali'],
    },
  },
  args: {
    items: [
      { label: 'Etusivu', to: '/' },
      { label: 'Osaamisprofiili', to: '/osaamispolkuni' },
      { label: 'Työpaikkani' },
    ],
    LinkComponent: ({ to, children }) => <a href={to}>{children}</a>,
    ariaLabel: 'Breadcrumb',
    serviceVariant: 'yksilo',
  },
};
