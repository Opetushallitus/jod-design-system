import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { useCookieConsent } from './CookieConsentContext';
import { CookieConsentModal } from './CookieConsentModal';
import { createCookieConsentContextValue } from './CookieConsentTestUtils';

vi.mock('./CookieConsentContext', async () => {
  const actual = await vi.importActual<typeof import('./CookieConsentContext')>('./CookieConsentContext');
  return {
    ...actual,
    useCookieConsent: vi.fn(),
  };
});

vi.mock('../Button/Button', () => ({
  Button: ({ label, onClick }: { label: string; onClick: () => void }) => <button onClick={onClick}>{label}</button>,
}));

vi.mock('../Modal/Modal', () => ({
  Modal: ({
    topSlot,
    content,
    footer,
  }: {
    topSlot: React.ReactNode;
    content: React.ReactNode;
    footer: React.ReactNode;
  }) => (
    <div>
      <div data-testid="top-slot">{topSlot}</div>
      <div data-testid="content">{content}</div>
      <div data-testid="footer">{footer}</div>
    </div>
  ),
}));

const mockedUseCookieConsent = vi.mocked(useCookieConsent);

describe('CookieConsentModal', () => {
  it('renders translated content and policy link', () => {
    mockedUseCookieConsent.mockReturnValue(createCookieConsentContextValue({ consent: null }));

    render(<CookieConsentModal />);

    expect(screen.getByRole('heading', { name: 'Cookies' })).toBeInTheDocument();
    expect(screen.getByText('Cookie description')).toBeInTheDocument();
    expect(screen.getByText('Necessary cookies')).toBeInTheDocument();
    expect(screen.getByText('Third-party content')).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/en/privacy-notice-and-cookies');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('shows current selection label when consent exists', () => {
    mockedUseCookieConsent.mockReturnValue(
      createCookieConsentContextValue({
        consent: {
          thirdPartyContent: true,
        },
      }),
    );

    render(<CookieConsentModal />);

    const selectionLabel = screen.getByText('Current selection:');
    expect(selectionLabel).toBeInTheDocument();
    expect(selectionLabel.closest('p')).toHaveTextContent('Accept all');
  });

  it('calls save with accepted consent when clicking accept all', async () => {
    const save = vi.fn();
    mockedUseCookieConsent.mockReturnValue(createCookieConsentContextValue({ consent: null, save }));
    const user = userEvent.setup();

    render(<CookieConsentModal />);
    await user.click(screen.getByRole('button', { name: 'Accept all' }));

    expect(save).toHaveBeenCalledWith({
      thirdPartyContent: true,
    });
  });

  it('calls save with declined consent when clicking decline optional', async () => {
    const save = vi.fn();
    mockedUseCookieConsent.mockReturnValue(createCookieConsentContextValue({ consent: null, save }));
    const user = userEvent.setup();

    render(<CookieConsentModal />);
    await user.click(screen.getByRole('button', { name: 'Decline optional' }));

    expect(save).toHaveBeenCalledWith({
      thirdPartyContent: false,
    });
  });
});
