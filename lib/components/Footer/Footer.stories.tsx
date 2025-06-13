import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { fn } from 'storybook/test';
import { Footer } from './Footer';

const meta = {
  title: 'Navigation/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'desktop',
  },
};

const okmLabel = 'Opetus- ja kulttuuriministeriö';
const temLabel = 'Työ- ja elinkeinoministeriö';
const ophLabel = 'Opetushallitus';
const kehaLabel = 'KEHA-keskus';
const cooperationTitle = 'Osaamipolku on toteutettu yhteistyössä seuraavien tahojen toimesta.';
const fundingTitle = 'Palvelu on rahoitettu Euroopan RFF-rahoituksella.';
const copyright = '© Osaamispolku 2025. Kaikki oikeudet pidätetään.';

const moreInfoLinks = [
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

const moreInfoTitle = 'Haluatko tietää lisää Osaamispolusta?';
const moreInfoDescription =
  'Mietityttääkö tietosuoja tai tekoälyn hyödyntäminen palvelussa? Alta löydät kootusti yleistä tietoa palvelusta ja sen käytöstä.';

const feedbackTitle = 'Kerro meille mitä pidit palvelusta!';
const feedbackContent =
  'Haluamme kehittää Osaamispolkua vastaamaan paremmin juuri sinun tarpeita. Anna meille palautetta ja huomiomme sen kehitystyössä.';
const feedbackButtonLabel = 'Anna palautetta';
const feedbackBgImageClassName =
  'ds:bg-[url(@/../assets/home-1.avif)] ds:bg-cover ds:bg-[length:auto_auto] ds:sm:bg-[length:auto_1000px] ds:bg-[top_-0rem_right_-0rem] ds:sm:bg-[top_-21rem_right_0rem]';

const LinkComponent = ({ children, to, className }: { children: React.ReactNode; className?: string; to: string }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const args = {
  language: 'fi',
  okmLabel,
  temLabel,
  ophLabel,
  kehaLabel,
  cooperationTitle,
  fundingTitle,
  copyright,
  moreInfoTitle,
  moreInfoDescription,
  moreInfoLinks,
  MoreInfoLinkComponent: LinkComponent,
  feedbackTitle,
  feedbackContent,
  feedbackButtonLabel,
  feedbackOnClick: fn(),
  feedbackBgImageClassName,
};

export const Default: Story = {
  parameters: {
    ...parameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=11906-38930',
    },
    docs: {
      description: {
        story: 'This is a light footer component with navigation items.',
      },
    },
  },
  args: args,
};

export const Mobile: Story = {
  parameters: {
    ...parameters,
    viewport: {
      defaultViewport: 'mobile',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=12043-45255',
    },
    docs: {
      description: {
        story: 'This is a mobie footer component with navigation items.',
      },
    },
  },
  args: args,
};
