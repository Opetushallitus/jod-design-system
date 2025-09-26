import type { ArgTypes, ReactRenderer, StoryObj } from '@storybook/react-vite';
import { PartialStoryFn } from 'storybook/internal/types';
import { useRef, useState } from 'storybook/preview-api';
import { JodCaretDown, JodMenu, JodUser } from '../../icons';
import { useMediaQueries } from '../../main';
import type { TitledMeta } from '../../utils';
import { LanguageButton } from './LanguageButton';
import { NavigationBar, NavigationBarProps } from './NavigationBar';

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
  render: (args) => {
    const { md } = useMediaQueries();

    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const handleBlur = () => setLangMenuOpen(false);

    const buttonClassNames =
      'ds:flex ds:md:flex-row ds:flex-col ds:gap-2 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer';

    const menuComponent = (
      <button className={buttonClassNames} aria-label="Avaa valikko">
        <JodMenu size={24} className="ds:mx-auto" />
        <span className="ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px]">Valikko</span>
      </button>
    );

    const languageButtonComponent = (
      <LanguageButton
        supportedLanguageCodes={['fi', 'sv', 'en']}
        onClick={() => setLangMenuOpen(!langMenuOpen)}
        langMenuOpen={langMenuOpen}
        menuRef={menuRef}
        language="fi"
        onMenuBlur={handleBlur}
        onMenuClick={() => setLangMenuOpen(false)}
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
    );

    const userButtonComponent = (
      <button className={buttonClassNames}>
        <JodUser size={24} className="ds:mx-auto" />
        <span className="ds:whitespace-nowrap ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px]">Juho-Henrik</span>
        {md && <JodCaretDown size={20} />}
      </button>
    );

    return (
      <NavigationBar
        {...args}
        userButtonComponent={userButtonComponent}
        languageButtonComponent={languageButtonComponent}
        menuComponent={menuComponent}
      />
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
