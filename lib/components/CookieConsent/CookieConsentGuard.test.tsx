import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { useCookieConsent } from './CookieConsentContext';
import { CookieConsentGuard } from './CookieConsentGuard';
import { createCookieConsentContextValue } from './CookieConsentTestUtils';

vi.mock('./CookieConsentContext', async () => {
  const actual = await vi.importActual<typeof import('./CookieConsentContext')>('./CookieConsentContext');
  return {
    ...actual,
    useCookieConsent: vi.fn(),
  };
});

vi.mock('../../main', () => ({
  Button: ({ label, onClick }: { label: string; onClick: () => void }) => <button onClick={onClick}>{label}</button>,
}));

const mockedUseCookieConsent = vi.mocked(useCookieConsent);

describe('CookieConsentGuard', () => {
  it('renders children when all required categories are consented', () => {
    mockedUseCookieConsent.mockReturnValue(
      createCookieConsentContextValue({
        consent: {
          thirdPartyContent: true,
        },
        isOpen: false,
      }),
    );

    render(
      <CookieConsentGuard categories={['thirdPartyContent']}>
        <div>Protected content</div>
      </CookieConsentGuard>,
    );

    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('renders fallback with action button when consent is missing and fallback is enabled', async () => {
    const open = vi.fn();
    mockedUseCookieConsent.mockReturnValue(createCookieConsentContextValue({ consent: null, isOpen: false, open }));
    const user = userEvent.setup();

    render(
      <CookieConsentGuard categories={['thirdPartyContent']} fallback>
        <div>Protected content</div>
      </CookieConsentGuard>,
    );

    expect(screen.getByText('Blocked content')).toBeInTheDocument();
    expect(screen.getByText('Please allow cookies to view this content')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open cookie settings' }));
    expect(open).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when consent is missing and fallback is not enabled', () => {
    mockedUseCookieConsent.mockReturnValue(createCookieConsentContextValue({ consent: null, isOpen: false }));

    const { container } = render(
      <CookieConsentGuard categories={['thirdPartyContent']}>
        <div>Protected content</div>
      </CookieConsentGuard>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
