import type { ArgTypes, ReactRenderer, StoryObj } from '@storybook/react-vite';
import { PartialStoryFn } from 'storybook/internal/types';
import { useState } from 'storybook/preview-api';
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
import { NoteStackProvider } from './NoteStackProvider';
import { useNoteStack } from './useNoteStack';

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
  portalLinkComponent: ({ children, className }: LinkComponent) => (
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
  externalLinkIconAriaLabel: 'Linkki johtaa palvelun ulkopuolelle',
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
    <NoteStackProvider>
      <div className="ds:pb-11 ds:bg-bg-gray">
        <header role="banner" className="ds:sticky ds:top-0 ds:z-30">
          <Story />
        </header>
        {new Array(30).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.').map((text, index) => (
          <p key={index} className="ds:p-4 ds:text-sm">
            {index + 1}. {text}
          </p>
        ))}
      </div>
    </NoteStackProvider>
  ),
];
const renderLink: NavigationBarProps['renderLink'] = ({ children }) => <a href="#">{children}</a>;
const logo: NavigationBarProps['logo'] = {
  to: '/',
  language: 'fi',
  srText: 'JOD',
};

export const Default: Story = {
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
    serviceBarVariant: 'yksilo',
    serviceBarTitle: 'Osaamispolkuni',
    translations: {
      versionLabel: 'Testausversio',
      showAllNotesLabel: 'Näytä kaikki',
      ariaLabelCloseNote: 'Sulje ilmoitus',
    },
  },
  render: (props: NavigationBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <NoteStackProvider>
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
                linkComponent={({ children, className, ...rest }) => (
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
      </NoteStackProvider>
    );
  },
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
  render: (props: NavigationBarProps) => {
    const { permanentNotes, setPermanentNotes, addPermanentNote, temporaryNotes, setTemporaryNotes, addTemporaryNote } =
      useNoteStack();

    return (
      <>
        <NavigationBar
          {...props}
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
              linkComponent={({ children, className, ...rest }) => (
                <a href="/#" className={className} {...rest}>
                  {children}
                </a>
              )}
            />
          }
        />
        <div className="ds:fixed ds:bottom-0 ds:flex ds:flex-row ds:gap-7 ds:bg-white ds:w-full ds:p-5 ds:justify-center">
          <button
            onClick={() => {
              addPermanentNote(() => ({
                title: `${permanentNotes.length + permanentNotes.length + 1}. Uusi pysyvä ilmoitus palkissa`,
                description: 'Tämä on ilmoituksen lisätekstiä.',
                variant: 'feedback',
              }));
            }}
            className="ds:cursor-pointer ds:hover:underline"
          >
            Lisää pysyvä ilmoitus palkkiin
          </button>
          <button
            onClick={() => {
              addTemporaryNote(() => ({
                title: `${permanentNotes.length + temporaryNotes.length + 1}. Uusi ilmoitus palkissa`,
                description: 'Tämä on ilmoituksen lisätekstiä.',
                variant: 'warning',
                isCollapsed: false,
              }));
            }}
            className="ds:cursor-pointer ds:hover:underline"
          >
            Lisää ilmoitus palkkiin
          </button>
          <button
            onClick={() => {
              setPermanentNotes([]);
              setTemporaryNotes([]);
            }}
            className="ds:cursor-pointer ds:hover:underline"
          >
            Tyhjennä ilmoitukset
          </button>
        </div>
      </>
    );
  },
  argTypes,
  args: {
    renderLink,
    logo,
    serviceBarVariant: 'yksilo',
    serviceBarTitle: 'Osaamispolkuni',
    translations: {
      versionLabel: 'Testausversio',
      showAllNotesLabel: 'Näytä kaikki',
      ariaLabelCloseNote: 'Sulje ilmoitus',
    },
  },
};
