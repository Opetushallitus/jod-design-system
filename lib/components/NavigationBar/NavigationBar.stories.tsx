import type { ArgTypes, ReactRenderer, StoryObj } from '@storybook/react-vite';
import { PartialStoryFn } from 'storybook/internal/types';
import { fn } from 'storybook/test';
import {
  LinkComponent,
  MenuButton,
  NavigationMenu,
  NavigationMenuProps,
  ServiceVariantProvider,
  UserButton,
} from '../../main';
import type { TitledMeta } from '../../utils';
import { externalLinkSections, languageSelectionItems, menuSection } from '../NavigationMenu/commonStoriesData';
import { LanguageButton } from './LanguageButton';
import { NavigationBar, NavigationBarProps } from './NavigationBar';

import { useState } from 'storybook/preview-api';

const meta = {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: [
        'refs',
        'logo',
        'renderLink',
        'userButtonComponent',
        'LinkComponent',
        'serviceBarContent',
        'languageButtonComponent',
        'menuComponent',
      ],
    },
  },
} satisfies TitledMeta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const menuProps: NavigationMenuProps = {
  portalLinkLabel: 'Osaamispolkuportaali',
  PortalLinkComponent: ({ children, className }: LinkComponent) => (
    <a href="/#" className={className}>
      {children}
    </a>
  ),
  onClose: fn(),
  open: true,
  menuSection: menuSection,
  openSubMenuLabel: 'Avaa alivalikko',
  ariaCloseMenu: 'Sulje valikko',
  externalLinkSections: externalLinkSections,
  languageSelectionItems: languageSelectionItems,
  languageSelectionTitle: 'Käyttökieli',
  selectedLanguage: 'fi',
  serviceVariant: 'yksilo',
};

const argTypes: Partial<ArgTypes<NavigationBarProps>> = {
  serviceBarVariant: {
    control: { type: 'radio' },
    options: ['yksilo', 'ohjaaja', 'tietopalvelu', 'palveluportaali'],
  },
};

const parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'desktop',
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14026-26589',
  },
};

// Common decorators and props for stories to avoid SonarQube duplication issues
const decorators = [
  (Story: PartialStoryFn<ReactRenderer, NavigationBarProps>) => (
    <div className="ds:pb-11 ds:h-[280px]">
      <Story />
    </div>
  ),
];
const renderLink: NavigationBarProps['renderLink'] = ({ children }) => <a href="#">{children}</a>;
const logo: NavigationBarProps['logo'] = {
  to: '/',
  language: 'fi',
  srText: 'JOD',
};

const DefaultRender = (props: NavigationBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ServiceVariantProvider value="yksilo">
      <NavigationBar
        {...props}
        userButtonComponent={
          <UserButton
            serviceVariant="yksilo"
            firstName="Juho-Henrik"
            isLoggedIn
            isProfileActive={false}
            loginLabel="Kirjaudu"
            profileLabel="Osaamisprofiilini"
            logoutLabel="Kirjaudu ulos"
            onLogout={() => console.log('logout')}
            profileLinkComponent={(props) => <a {...props} href="/#" />}
            loginLinkComponent={(props) => <a {...props} href="/#" />}
          />
        }
        languageButtonComponent={
          <LanguageButton
            serviceVariant="yksilo"
            supportedLanguageCodes={['fi', 'sv', 'en']}
            language="fi"
            translations={{
              fi: { change: 'Vaihda kieli.', label: 'Suomeksi' },
              sv: { change: 'Andra språk.', label: 'På svenska' },
              en: { change: 'Change language.', label: 'In English' },
            }}
            generateLocalizedPath={(code: string) => `/${code}`}
            LinkComponent={({ children, className, ...rest }) => (
              <a href="/#" className={className} {...rest}>
                {children}
              </a>
            )}
          />
        }
        menuComponent={<MenuButton label="Valikko" onClick={() => setIsOpen(true)} />}
      />
      <NavigationMenu {...menuProps} open={isOpen} onClose={() => setIsOpen(false)} />
    </ServiceVariantProvider>
  );
};

export const Default: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'This is a light navigation bar with logo, menu, language, and user buttons.',
      },
    },
  },
  argTypes,
  args: {
    renderLink,
    logo,
    showServiceBar: false,
  },
  render: DefaultRender,
};

export const WithServiceBar: Story = {
  decorators,
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'Navigation bar with a customizable service bar below it. Collapses when page is scrolled down.',
      },
    },
  },
  argTypes,
  args: {
    renderLink,
    logo,
    showServiceBar: true,
    serviceBarVariant: 'yksilo',
    serviceBarTitle: 'Osaamispolkuni',
    serviceBarContent: (
      <input
        type="text"
        className="ds:bg-white ds:h-7 ds:placeholder:text-[#777] ds:px-4 ds:rounded"
        placeholder="Hae"
      />
    ),
  },
};
