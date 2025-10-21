import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Footer } from './Footer';

const mockOkmLabel = 'Opetus- ja kulttuuriministeriö';
const mockTemLabel = 'Työ- ja elinkeinoministeriö';
const mockOphLabel = 'Opetushallitus';
const mockKehaLabel = 'KEHA-keskus';
const mockCooperationTitle = 'Osaamipolku on toteutettu yhteistyössä seuraavien tahojen toimesta.';
const mockFundingTitle = 'Palvelu on rahoitettu Euroopan RFF-rahoituksella.';
const mockCopyright = '© Osaamispolku 2025. Kaikki oikeudet pidätetään.';

const mockMoreInfoLinks = [
  {
    href: '/fi/tietoa-palvelusta',
    label: 'Tietoa palvelusta',
  },
  {
    href: '/fi/tietosuojaseloste-ja-evasteet',
    label: 'Tietosuojaselosteet ja evästeet',
  },
  {
    href: '/fi/datalahteet',
    label: 'Datalähteet',
  },
  {
    href: '/fi/tietoa-tekoalyn-kaytosta',
    label: 'Tietoa tekoälyn käytöstä',
  },
  {
    href: '/fi/tietoa-saavutettavuudesta',
    label: 'Saavutettavuusseloste',
  },
];

const mockMoreInfoTitle = 'Haluatko tietää lisää Osaamispolusta?';
const mockMoreInfoDescription =
  'Mietityttääkö tietosuoja tai tekoälyn hyödyntäminen palvelussa? Alta löydät kootusti yleistä tietoa palvelusta ja sen käytöstä.';

const mockFeedbackTitle = '';
const mockFeedbackContent = '';
const mockFeedbackButtonLabel = '';
const mockFeedbackBgImageClassName = '';

const FooterComponent = (
  <Footer
    language="fi"
    okmLabel={mockOkmLabel}
    temLabel={mockTemLabel}
    ophLabel={mockOphLabel}
    kehaLabel={mockKehaLabel}
    cooperationTitle={mockCooperationTitle}
    fundingTitle={mockFundingTitle}
    moreInfoLinks={mockMoreInfoLinks}
    moreInfoTitle={mockMoreInfoTitle}
    moreInfoDescription={mockMoreInfoDescription}
    copyright={mockCopyright}
    feedbackTitle={mockFeedbackTitle}
    feedbackContent={mockFeedbackContent}
    feedbackButtonLabel={mockFeedbackButtonLabel}
    feedbackOnClick={vi.fn()}
    feedbackBgImageClassName={mockFeedbackBgImageClassName}
    externalLinkIconAriaLabel="Linkki johtaa palvelun ulkopuolelle"
  />
);

describe('Footer', () => {
  it('renders', () => {
    const { container } = render(FooterComponent);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders copyright', () => {
    const { container } = render(FooterComponent);
    const copyright = screen.getByText('© Osaamispolku 2025. Kaikki oikeudet pidätetään.');
    expect(copyright).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('emits data-testid when provided', () => {
  render(
    <Footer
      language="fi"
      okmLabel={mockOkmLabel}
      temLabel={mockTemLabel}
      ophLabel={mockOphLabel}
      kehaLabel={mockKehaLabel}
      cooperationTitle={mockCooperationTitle}
      fundingTitle={mockFundingTitle}
      moreInfoLinks={mockMoreInfoLinks}
      moreInfoTitle={mockMoreInfoTitle}
      moreInfoDescription={mockMoreInfoDescription}
      copyright={mockCopyright}
      feedbackTitle={mockFeedbackTitle}
      feedbackContent={mockFeedbackContent}
      feedbackButtonLabel={mockFeedbackButtonLabel}
      feedbackOnClick={vi.fn()}
      feedbackBgImageClassName={mockFeedbackBgImageClassName}
      externalLinkIconAriaLabel="Linkki johtaa palvelun ulkopuolelle"
      dataTestId="footer"
    />,
  );
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});
