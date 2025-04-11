import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';

import { ContentCard } from './ContentCard';

const meta = {
  title: 'Cards/ContentCard',
  component: ContentCard,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof ContentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const Link = ({ children, to, className }: { children: React.ReactNode; to?: string; className?: string }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8588',
    },
    docs: {
      description: {
        story: 'This is a simple content card component for "ohjaaja" UI.',
      },
    },
  },
  args: {
    title: 'Tulevaisuusmatka',
    description:
      'Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet, lorem velit osana ei osaa sanoa mitä accumsan dolor nonummy.',
    path: ['Asiakastyön tueksi', 'Itsetuntemus'],
    to: '#cardlink',
    linkComponent: Link,
    tags: [
      { label: 'Taglorem', to: '#tag1link' },
      { label: 'Loremtag', to: '#tag2link' },
      { label: 'Nonutag', to: '#tag3link' },
    ],
    className: 'ds:bg-white',
  },
};
