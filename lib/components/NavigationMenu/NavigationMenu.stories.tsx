import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { Button } from '../Button/Button';
import { ExternalLinkSection } from './ExternalLinkSections';
import { MenuItem } from './MenuList';
import { NavigationMenu, NavigationMenuProps } from './NavigationMenu';
import { LinkComponent } from './types';

const meta = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=10543-34956',
  },
};

const DummyLink = (props: LinkComponent) => <a href="/#" {...props} />;

const menuItems: MenuItem[] = [
  {
    label: 'Osaamispolkuni',
    LinkComponent: DummyLink,
    selected: true,
  },
  {
    label: 'Kartoita tilanteesi',
    // One left in a long form as an example to remind how to use
    LinkComponent: ({ children, className, ...rest }: LinkComponent) => (
      <a href="/#" className={className} {...rest}>
        {children}
      </a>
    ),
    childItems: [
      {
        label: 'Kartoita tilanteesi',
        LinkComponent: DummyLink,
      },
      {
        label: 'Osaamisen kartoitus',
        LinkComponent: DummyLink,
      },
      {
        label: 'Kiinnostusten kartoitus',
        LinkComponent: DummyLink,
      },
      {
        label: 'Työ- ja koulutusmahdollisuudet',
        LinkComponent: DummyLink,
      },
    ],
  },
  {
    label: 'Osaamisprofiilini',
    LinkComponent: DummyLink,
    childItems: [
      {
        label: 'Osaamisprofiilini',
        LinkComponent: DummyLink,
      },
      {
        label: 'Asetukseni',
        LinkComponent: DummyLink,
      },
      {
        label: 'Suosikkini',
        LinkComponent: DummyLink,
      },
      {
        label: 'Päämääräni',
        LinkComponent: DummyLink,
      },
      {
        label: 'Osaamiseni',
        LinkComponent: DummyLink,
        childItems: [
          {
            label: 'Työpaikkani',
            LinkComponent: DummyLink,
          },
          {
            label: 'Koulutukseni',
            LinkComponent: DummyLink,
          },
          {
            label: 'Vapaa-ajan toimintoni',
            LinkComponent: DummyLink,
          },
          {
            label: 'Muut osaamiseni',
            LinkComponent: DummyLink,
          },
        ],
      },
      {
        label: 'Kiinnostuksen kohteeni',
        LinkComponent: DummyLink,
      },
      {
        label: 'Väliotsikko 2',
      },
      {
        label: 'Lorem ipsum 2',
        LinkComponent: DummyLink,
      },
    ],
  },
  {
    label: 'Väliotsikko',
  },
  {
    label: 'Lorem ipsum',
    LinkComponent: DummyLink,
  },
];

const externalLinkSections: ExternalLinkSection[] = [
  {
    title: 'Osaamispolun sisältökokonaisuudet',
    linkItems: [
      {
        label: 'Ohjaajan osio',
        url: 'https://www.example.com',
        description: 'Ohjausalasta kiinnostuneille',
        accentColor: '#66CBD1',
      },
      {
        label: 'Tietopalvelu',
        url: 'https://www.example.com',
        description: 'Tietoa päätöksentekijöille',
        accentColor: '#EBB8E1',
      },
    ],
  },
];

const DummyLangLink = ({ href, ...props }: LinkComponent & { href: string }) => <a href={href} {...props} />;

const languageSelectionItems = [
  {
    label: 'Suomeksi',
    value: 'fi',
    linkComponent: (props: LinkComponent) => <DummyLangLink href="#?lang=fi" {...props} />,
  },
  {
    label: 'På svenska',
    value: 'sv',
    linkComponent: (props: LinkComponent) => <DummyLangLink href="#?lang=sv" {...props} />,
  },
  {
    label: 'In English',
    value: 'en',
    linkComponent: (props: LinkComponent) => <DummyLangLink href="#?lang=en" {...props} />,
  },
];

const DefaultRender = (props: NavigationMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Button label="Open menu" onClick={() => setIsOpen(true)} variant="white" />

      <NavigationMenu {...props} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'NavigationMenu component for displaying a list of links.',
      },
    },
  },
  render: DefaultRender,
  args: {
    frontPageLinkLabel: 'Etusivu',
    FrontPageLinkComponent: ({ children, className }: LinkComponent) => (
      <a href="/#" className={className}>
        {children}
      </a>
    ),
    onClose: fn(),
    open: true,
    backLabel: 'Takaisin',
    accentColor: '#85C4EC',
    accentColorText: '#006DB3',
    menuItems: menuItems,
    openSubMenuLabel: 'Avaa alivalikko',
    ariaCloseMenu: 'Sulje valikko',
    externalLinkSections: externalLinkSections,
    languageSelectionItems: languageSelectionItems,
    selectedLanguage: 'fi',
  },
};
