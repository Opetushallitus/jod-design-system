import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { LanguageButton } from './LanguageButton';
import { LanguageButtonProps } from './types';

const translations = {
  fi: { label: 'Suomi', change: 'Vaihda kieleksi suomi' },
  en: { label: 'English', change: 'Change language to English' },
  sv: { label: 'Svenska', change: 'Byt språk till svenska' },
};

const LinkComponent = ({ href = '#', children }: { href?: string; children: React.ReactNode }) => (
  <a href={href} data-testid="link">
    {children}
  </a>
);

const generateLocalizedPath = (lang: string) => `/${lang}/path`;

const baseProps: LanguageButtonProps = {
  serviceVariant: 'yksilo',
  language: 'fi' as const,
  supportedLanguageCodes: ['fi', 'en', 'sv'],
  generateLocalizedPath,
  LinkComponent,
  translations,
  dataTestId: 'language-button',
};

describe('LanguageButton', () => {
  it('should toggle menu open and closed on consecutive clicks', () => {
    const { getByTestId, queryByTestId } = render(<LanguageButton {...baseProps} />);
    const trigger = getByTestId('language-button-trigger');
    fireEvent.click(trigger);
    expect(getByTestId('language-button-menu')).not.toBeNull();
    fireEvent.click(trigger);
    expect(queryByTestId('language-button-menu')).toBeNull();
  });

  it('should display current language label', () => {
    const { getByText } = render(<LanguageButton {...baseProps} language="sv" />);
    expect(getByText('Svenska')).not.toBeNull();
  });
});

describe('Snapshot', () => {
  it('should render with defaults', () => {
    const { container } = render(<LanguageButton {...baseProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with menu open (after click)', () => {
    const { container, getByTestId } = render(<LanguageButton {...baseProps} />);
    const trigger = getByTestId('language-button-trigger');
    fireEvent.click(trigger);
    const menu = getByTestId('language-button-menu');
    expect(menu).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});
