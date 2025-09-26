import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { LanguageButton } from './LanguageButton';
import { LangCode } from './types';

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

describe('LanguageButton', () => {
  const baseProps = () => ({
    onClick: vi.fn(),
    langMenuOpen: false,
    menuRef: React.createRef<HTMLDivElement>(),
    onMenuBlur: vi.fn(),
    onMenuClick: vi.fn(),
    language: 'fi' as const,
    supportedLanguageCodes: ['fi', 'en', 'sv'] as LangCode[],
    generateLocalizedPath,
    LinkComponent,
    translations,
    dataTestId: 'language-button',
  });

  it('invokes onClick when trigger button is clicked', () => {
    const mockOnClick = vi.fn();
    render(<LanguageButton {...baseProps()} onClick={mockOnClick} />);
    fireEvent.click(screen.getByTestId('language-button-trigger'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('fires onMenuBlur when menu loses focus', () => {
    const mockOnMenuBlur = vi.fn();
    render(<LanguageButton {...baseProps()} onMenuBlur={mockOnMenuBlur} langMenuOpen={true} />);
    const menuWrapper = screen.getByTestId('language-button-menu');
    fireEvent.blur(menuWrapper);
    expect(mockOnMenuBlur).toHaveBeenCalledTimes(1);
  });

  describe('Snapshot', () => {
    it('should render with defaults', () => {
      const { container } = render(<LanguageButton {...baseProps()} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with menu open', () => {
      const { container } = render(<LanguageButton {...baseProps()} langMenuOpen />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
