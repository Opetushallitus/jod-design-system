import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';

import { MoreInfo } from './MoreInfo';

const meta = {
  title: 'Navigation/MoreInfo',
  component: MoreInfo,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof MoreInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

const links = [
  {
    to: 'ohjeet/tietoa-palvelusta',
    label: 'Tietoa palvelusta',
  },
  {
    to: 'perustiedot/tietosuojaseloste',
    label: 'Tietosuojaselosteet ja evästeet',
  },
  {
    to: 'perustiedot/datalahteet',
    label: 'Datalähteet',
  },
  {
    to: 'perustiedot/tietoa-tekoalysta',
    label: 'Tietoa tekoälyn käytöstä',
  },
  {
    to: 'perustiedot/saavutettavuusseloste',
    label: 'Saavutettavuusseloste',
  },
];

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/a3heEFNpoI9MRcMFtbYVfO/Osaamispolku---Design-system?node-id=1048-4317',
    },
  },
  args: {
    title: 'Haluatko tietää lisää Osaamispolusta?',
    description:
      'Mietityttääkö tietosuoja tai tekoälyn hyödyntäminen palvelussa? Alta löydät kootusti yleistä tietoa palvelusta ja sen käytöstä.',
    language: 'fi',
    links: links,
    LinkComponent: ({ children, to, className }) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
  },
};
