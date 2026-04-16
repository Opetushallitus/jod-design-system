import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { axe } from 'jest-axe';
import { Footer } from './Footer';

const footerProps = {
  language: 'fi',
  okmLabel: 'Opetus- ja kulttuuriministeriö',
  temLabel: 'Työ- ja elinkeinoministeriö',
  ophLabel: 'Opetushallitus',
  kehaLabel: 'KEHA-keskus',
  cooperationTitle: 'Osaamipolku on toteutettu yhteistyössä seuraavien tahojen toimesta.',
  fundingTitle: 'Palvelu on rahoitettu Euroopan RFF-rahoituksella.',
  moreInfoLinks: [
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
  ],
  moreInfoTitle: 'Haluatko tietää lisää Osaamispolusta?',
  moreInfoDescription:
    'Mietityttääkö tietosuoja tai tekoälyn hyödyntäminen palvelussa? Alta löydät kootusti yleistä tietoa palvelusta ja sen käytöstä.',
  copyright: '© Osaamispolku 2026. Kaikki oikeudet pidätetään.',
  feedbackTitle: 'Title',
  feedbackContent: 'Content',
  feedbackButtonLabel: 'Feedback',
  socialMedia: {
    facebook: {
      href: 'https://www.facebook.com/osaamispolku',
      label: 'Osaamispolku Facebook',
    },
    linkedin: {
      href: 'https://www.linkedin.com/company/osaamispolku',
      label: 'Osaamispolku LinkedIn',
    },
    instagram: {
      href: 'https://www.instagram.com/osaamispolku',
      label: 'Osaamispolku Instagram',
    },
  },
  feedbackOnClick: vi.fn(),
  feedbackBgImageClassName: '',
  externalLinkIconAriaLabel: 'Linkki johtaa palvelun ulkopuolelle',
};

const FooterComponent = <Footer {...footerProps} />;

describe('Footer', () => {
  it('renders', () => {
    const { container } = render(FooterComponent);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders copyright', () => {
    const { container } = render(FooterComponent);
    const copyright = screen.getByText('© Osaamispolku 2026. Kaikki oikeudet pidätetään.');
    expect(copyright).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('emits data-testid when provided', () => {
    render(<Footer {...footerProps} testId="footer" />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(FooterComponent);
    expect(await axe(container)).toHaveNoViolations();
  });
});
