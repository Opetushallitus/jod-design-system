import type { ReactRenderer, StoryObj } from '@storybook/react-vite';
import { PartialStoryFn } from 'storybook/internal/types';
import { fn } from 'storybook/test';
import {
  cx,
  LinkComponent,
  MenuButton,
  NavigationMenu,
  NavigationMenuProps,
  Note,
  ServiceVariantProvider,
  UserButton,
} from '../../main';
import { getAccentBgClassForService, type TitledMeta } from '../../utils';
import { externalLinkSections, languageSelectionItems, menuSection } from '../NavigationMenu/commonStoriesData';
import { LanguageButton } from './LanguageButton';
import { NavigationBar, NavigationBarProps } from './NavigationBar';

import React from 'react';
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
  externalLinkIconAriaLabel: 'Linkki johtaa palvelun ulkopuolelle',
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
  args: {
    renderLink,
    logo,
  },
  render: DefaultRender,
};

export const WithServiceBarAndNoteStack: Story = {
  render: (args) => {
    const [dummy, setDummy] = React.useState<string[]>(new Array(20).fill('Tämä on esimerkkisisältöä sivulla.'));

    const [direction, setDirection] = React.useState<'up' | 'down'>('up');

    React.useEffect(() => {
      let lastScrollY = window.scrollY;

      const onScroll = () => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          setDirection(currentScrollY > lastScrollY ? 'down' : 'up');
          lastScrollY = currentScrollY;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
      <div className="ds:flex ds:flex-col ds:min-h-screen ds:bg-bg-gray">
        <header role="banner" className="ds:sticky ds:top-0 ds:z-10">
          <NavigationBar {...args} />
        </header>
        <div className="ds:sticky ds:top-[64px] ds:z-[5]">
          <div className="ds:absolute ds:top-0 ds:w-full ds:flex ds:flex-col">
            <div
              className={cx(
                'ds:flex',
                'ds:text-white',
                'ds:text-[12px]',
                'ds:sm:text-[14px]',
                'ds:h-8',
                'ds:transition-[margin]',
                'ds:duration-1000',
                getAccentBgClassForService('yksilo'),
                { 'ds:-mt-[36px]': direction === 'down' }, // 40px height - 4px buffer
              )}
            >
              <div className="ds:flex ds:xl:container ds:mx-auto ds:items-center ds:justify-between ds:w-full ds:sm:px-9 ds:px-5">
                Osaamispolkuni
              </div>
            </div>

            <Note
              title="1. Piilotettava varoitusilmoitus"
              description="Tämä ilmoitus katoaa sivun vierittäessä."
              variant="warning"
              className="ds:-z-[1]"
              direction={direction}
            />

            <Note
              title="2. Pysyvä ilmoitus"
              description="Tämä ilmoitus pysyy näkyvissä vaikka sivua vieritettäisiin."
              variant="feedback"
              className="ds:-z-[2]"
            />

            <Note
              title="3. Piilotettava varoitusilmoitus"
              description="Tämä ilmoitus katoaa sivun vierittäessä."
              variant="success"
              className="ds:-z-[3]"
              direction={direction}
            />

            <Note
              title="4. Piilotettava varoitusilmoitus"
              description="Tämä ilmoitus katoaa sivun vierittäessä."
              variant="warning"
              className="ds:-z-[4]"
              direction={direction}
            />

            <Note
              title="5. Pysyvä ilmoitus"
              description="Tämä ilmoitus pysyy näkyvissä vaikka sivua vieritettäisiin."
              variant="error"
              className="ds:-z-[5]"
            />

            <Note
              title="6. Piilotettava varoitusilmoitus"
              description="Tämä ilmoitus katoaa sivun vierittäessä."
              variant="warning"
              className="ds:-z-[6]"
              direction={direction}
            />
          </div>
        </div>
        <main role="main" className="ds:bg-white">
          {new Array(10).fill('Tämä on esimerkkisisältöä sivulla.').map((item, index) => (
            <p key={index} className="ds:p-5">
              {item}
            </p>
          ))}
          <button onClick={() => setDummy([...dummy, 'Tämä on esimerkkisisältöä sivulla.'])} className="ds:p-5">
            Lisää sisältöä sivulle
          </button>
          <button onClick={() => setDummy(dummy.slice(0, -1))} className="ds:p-5">
            Poista sisältöä sivulta
          </button>
          <button onClick={() => setDummy([])} className="ds:p-5">
            Poista kaikki sisältö
          </button>
          {dummy.map((item, index) => (
            <p key={index} className="ds:p-5">
              {item}
            </p>
          ))}
        </main>
      </div>
    );
  },
  parameters: {
    ...parameters,
    docs: {
      description: {
        story:
          'Navigation bar with a customizable service bar and note stack below it. Collapses when page is scrolled down.',
      },
    },
  },
  args: {
    renderLink,
    logo,
  },
};
