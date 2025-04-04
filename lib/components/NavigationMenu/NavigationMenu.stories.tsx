import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { ExternalLinkSection, LinkComponent, MenuItem, NavigationMenu, NavigationMenuProps } from './NavigationMenu';

const meta = {
  title: 'Layout/NavigationMenu',
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
// LinkComponent={({ children }: { children: React.ReactNode }) => <a href={loginLink}>{children}</a>}

const menuItems: MenuItem[] = [
  {
    label: 'Osaamispolkuni',
    LinkComponent: ({ children, className }: LinkComponent) => (
      <a href="/#" className={className}>
        {children}
      </a>
    ),
    selected: true,
  },
  {
    label: 'Kartoita tilanteesi',
    LinkComponent: ({ children, className }: LinkComponent) => (
      <a href="/#" className={className}>
        {children}
      </a>
    ),
    childItems: [
      {
        label: 'Kartoita tilanteesi',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
      {
        label: 'Osaamisen kartoitus',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
      {
        label: 'Kiinnostusten kartoitus',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
      {
        label: 'Työ- ja koulutusmahdollisuudet',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
    ],
  },
  {
    label: 'Osaamisprofiilini',
    LinkComponent: ({ children, className }: LinkComponent) => (
      <a href="/#" className={className}>
        {children}
      </a>
    ),
    childItems: [
      {
        label: 'Osaamisprofiilini',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
      {
        label: 'Asetukseni',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
      {
        label: 'Suosikkini',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
      {
        label: 'Päämääräni',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
      {
        label: 'Osaamiseni',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
        childItems: [
          {
            label: 'Työpaikkani',
            LinkComponent: ({ children, className }: LinkComponent) => (
              <a href="/#" className={className}>
                {children}
              </a>
            ),
          },
          {
            label: 'Koulutukseni',
            LinkComponent: ({ children, className }: LinkComponent) => (
              <a href="/#" className={className}>
                {children}
              </a>
            ),
          },
          {
            label: 'Vapaa-ajan toimintoni',
            LinkComponent: ({ children, className }: LinkComponent) => (
              <a href="/#" className={className}>
                {children}
              </a>
            ),
          },
          {
            label: 'Muut osaamiseni',
            LinkComponent: ({ children, className }: LinkComponent) => (
              <a href="/#" className={className}>
                {children}
              </a>
            ),
          },
        ],
      },
      {
        label: 'Kiinnostuksen kohteeni',
        LinkComponent: ({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        ),
      },
    ],
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

const languageSelectionItems = [
  {
    label: 'Suomeksi',
    value: 'fi',
  },
  {
    label: 'På svenska',
    value: 'sv',
  },
  {
    label: 'In English',
    value: 'en',
  },
];

const DefaultStoryRender = (props: NavigationMenuProps) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('fi');

  return (
    <NavigationMenu
      {...props}
      selectedLanguage={selectedLanguage}
      onLanguageChange={(newValue) => setSelectedLanguage(newValue)}
    />
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
  render: DefaultStoryRender,
  args: {
    frontPageLinkLabel: 'Etusivu',
    FrontPageLinkComponent: ({ children, className }: LinkComponent) => (
      <a href="/#" className={className}>
        {children}
      </a>
    ),
    accentColor: '#85C4EC',
    menuItems: menuItems,
    onClose: fn(),
    externalLinkSections: externalLinkSections,
    languageSelectionItems: languageSelectionItems,
    selectedLanguage: 'fi',
    onLanguageChange: fn(),
  },
};
