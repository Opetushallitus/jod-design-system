import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { Button, LanguageButton } from '../../main';
import { useCookieConsent } from './CookieConsentContext';
import { CookieConsentGuard } from './CookieConsentGuard';
import { CookieConsentProvider } from './CookieConsentProvider';

const meta = {
  title: 'Misc/CookieConsent',
  component: CookieConsentProvider,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof CookieConsentProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const CookieConsentContent = () => {
  const { open, serviceVariant } = useCookieConsent();
  return (
    <div className="ds:flex ds:flex-col ds:gap-5">
      <p> Tämä on näkyvissä, koska olet hyväksynyt kaikki evästeet.</p>
      <div>
        <Button serviceVariant={serviceVariant} variant="accent" label="Avaa evästeasetukset" onClick={() => open()} />
      </div>
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This is a demonstration of the CookieConsentProvider and CookieConsentGuard components. The content inside CookieConsentGuard is only shown if the user has given consent to thirdPartyContent cookie. Otherwise, a fallback UI is shown with a button to open the consent modal.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
    },
    languageButtonComponent: {
      control: false,
    },
  },
  args: {
    children: (
      <CookieConsentGuard categories={['thirdPartyContent']} fallback>
        <CookieConsentContent />
      </CookieConsentGuard>
    ),
    serviceVariant: 'yksilo',
    languageButtonComponent: (
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
    ),
    translations: {
      modal: {
        name: 'Evästeasetukset',
        title: 'Käytämme evästeitä',
        description:
          'Käytämme evästeitä sivuston toiminnan varmistamiseen ja valitun sisällön näyttämiseen. Välttämättömät evästeet ovat aina käytössä.',
        cookieCategoriesLabel: 'Evästekategoriat',
        cookiesCategoriesNecessary: 'Välttämättömät evästeet',
        cookiesCategoriesThirdParty: 'Kolmannen osapuolen sisältö',
        statisticsDescription: 'Seuraamme palvelun kävijämääriä Matomon avulla. Tähän ei kysytä erikseen suostumusta.',
        readMoreLabel: 'Lue lisää evästeistämme ja tietosuojakäytännöistämme.',
        readMoreHref: '/fi/tietosuojaseloste-ja-evasteet',
        currentSelectionLabel: 'Nykyinen valintasi',
        acceptAllLabel: 'Hyväksy kaikki',
        declineOptionalLabel: 'Hyväksy vain välttämättömät',
      },
      guard: {
        title: 'Välitämme yksityisyydestäsi',
        description:
          'Tämän toiselta sivustolta olevan sisällön näyttäminen on estetty kunnes hyväksyt kolmansien osapuolien asettamat evästeet. Lue evästekäytäntömme.',
        buttonLabel: 'Avaa luvat ja suostumukset',
      },
    },
  },
};
