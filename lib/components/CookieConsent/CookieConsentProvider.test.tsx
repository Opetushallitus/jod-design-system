import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCookieConsent } from './CookieConsentContext';
import { CookieConsentProvider } from './CookieConsentProvider';
import { readCookieConsent, writeCookieConsent } from './cookieConsentUtils';

vi.mock('./cookieConsentUtils', async () => {
  const actual = await vi.importActual<typeof import('./cookieConsentUtils')>('./cookieConsentUtils');

  return {
    ...actual,
    readCookieConsent: vi.fn(),
    writeCookieConsent: vi.fn(),
  };
});

vi.mock('./CookieConsentModal', () => ({
  CookieConsentModal: () => <div data-testid="cookie-consent-modal" />,
}));

const mockedReadCookieConsent = vi.mocked(readCookieConsent);
const mockedWriteCookieConsent = vi.mocked(writeCookieConsent);

let originalLocation: Location;
let reloadMock: ReturnType<typeof vi.fn>;

const languageButtonComponent = <button>Language</button>;

const translations = {
  modal: {
    name: 'Cookie settings',
    title: 'Cookies',
    description: 'Description',
    cookieCategoriesLabel: 'Categories',
    cookiesCategoriesNecessary: 'Necessary cookies',
    cookiesCategoriesThirdParty: 'Third-party content',
    statisticsDescription: 'Statistics cookies are used to collect information about how visitors use our website.',
    readMoreLabel: 'Read more here.',
    readMoreHref: '/en/privacy-notice-and-cookies',
    currentSelectionLabel: 'Current selection',
    acceptAllLabel: 'Accept all',
    declineOptionalLabel: 'Decline optional',
  },
  guard: {
    title: 'Blocked content',
    description: 'Please update your cookie settings',
    buttonLabel: 'Open settings',
  },
};

// eslint-disable-next-line react/prop-types
const TestConsumer = ({ nextConsent = { thirdPartyContent: false } }) => {
  const { consent, isOpen, save } = useCookieConsent();

  return (
    <>
      <p data-testid="is-open">{String(isOpen)}</p>
      <p data-testid="consent">{consent ? JSON.stringify(consent) : 'null'}</p>
      <button onClick={() => save(nextConsent)}>Save consent</button>
    </>
  );
};

describe('CookieConsentProvider', () => {
  beforeEach(() => {
    originalLocation = globalThis.location;
    reloadMock = vi.fn();
    const mutableGlobalThis = globalThis as unknown as { location?: Location };
    delete mutableGlobalThis.location;
    mutableGlobalThis.location = {
      ...originalLocation,
      reload: reloadMock as unknown as Location['reload'],
    };
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'location', {
      configurable: true,
      value: originalLocation,
    });
    vi.clearAllMocks();
  });

  it('loads existing cookie consent during initialization', () => {
    mockedReadCookieConsent.mockReturnValue({
      version: '1',
      timestamp: 123,
      consent: {
        thirdPartyContent: false,
      },
    });

    render(
      <CookieConsentProvider
        serviceVariant="yksilo"
        languageButtonComponent={languageButtonComponent}
        translations={translations}
      >
        <TestConsumer />
      </CookieConsentProvider>,
    );

    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
    expect(screen.getByTestId('consent')).toHaveTextContent('{"thirdPartyContent":false}');
    expect(screen.getByTestId('cookie-consent-modal')).toBeInTheDocument();
  });

  it('opens modal when no saved consent exists', () => {
    mockedReadCookieConsent.mockReturnValue(null);

    render(
      <CookieConsentProvider
        serviceVariant="yksilo"
        languageButtonComponent={<button>Language</button>}
        translations={translations}
      >
        <TestConsumer />
      </CookieConsentProvider>,
    );

    expect(screen.getByTestId('is-open')).toHaveTextContent('true');
    expect(screen.getByTestId('consent')).toHaveTextContent('null');
  });

  it('saves consent and closes modal without reloading when consent becomes more permissive', async () => {
    mockedReadCookieConsent.mockReturnValue(null);
    const user = userEvent.setup();

    render(
      <CookieConsentProvider
        serviceVariant="yksilo"
        languageButtonComponent={languageButtonComponent}
        translations={translations}
      >
        <TestConsumer />
      </CookieConsentProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Save consent' }));

    expect(mockedWriteCookieConsent).toHaveBeenCalledTimes(1);
    const saved = mockedWriteCookieConsent.mock.calls[0]?.[0];
    expect(saved).toBeDefined();
    expect(saved?.version).toBe('1');
    expect(typeof saved?.timestamp).toBe('number');
    expect(saved?.consent).toEqual({
      thirdPartyContent: false,
    });
    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
    expect(screen.getByTestId('consent')).toHaveTextContent('{"thirdPartyContent":false}');
    expect(reloadMock).not.toHaveBeenCalled();
  });

  it('reloads the page when consent becomes more restrictive', async () => {
    mockedReadCookieConsent.mockReturnValue({
      version: '1',
      timestamp: 123,
      consent: {
        thirdPartyContent: true,
      },
    });
    const user = userEvent.setup();

    render(
      <CookieConsentProvider
        serviceVariant="yksilo"
        languageButtonComponent={languageButtonComponent}
        translations={translations}
      >
        <TestConsumer nextConsent={{ thirdPartyContent: false }} />
      </CookieConsentProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Save consent' }));

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
