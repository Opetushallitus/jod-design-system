import '@testing-library/jest-dom';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HeroCard } from './HeroCard';

describe('HeroCard', () => {
  const title = 'Test Title';
  const content = 'Test Content';
  const buttonLabel = 'Test Button Label';
  const backgroundColor = '#444BACF2';

  it('renders HeroCard with a button', () => {
    render(
      <HeroCard
        to="/"
        LinkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        buttonLabel={buttonLabel}
        title={title}
        content={content}
        backgroundColor={backgroundColor}
        dataTestId="hero"
      />,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(buttonLabel)).toBeInTheDocument();
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('hero-button')).toBeInTheDocument();
  });

  it('renders HeroCard without a button', () => {
    render(<HeroCard title={title} content={content} backgroundColor={backgroundColor} dataTestId="hero2" />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByText(buttonLabel)).toBeNull();
    expect(screen.getByTestId('hero2')).toBeInTheDocument();
  });

  it('renders HeroCard with a link when size is sm', () => {
    render(
      <HeroCard
        to="/"
        LinkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        buttonLabel={buttonLabel}
        title={title}
        content={content}
        backgroundColor={backgroundColor}
        size="sm"
      />,
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('handles link clicks normally when onClick is not provided', () => {
    render(
      <HeroCard
        to="/"
        LinkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        buttonLabel={buttonLabel}
        title={title}
        content={content}
        backgroundColor={backgroundColor}
        size="sm"
      />,
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    const clickEvent = createEvent.click(linkElement);
    fireEvent(linkElement, clickEvent);
    expect(clickEvent.defaultPrevented).toBe(false);
  });
});
