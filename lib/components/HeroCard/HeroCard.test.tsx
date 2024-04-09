import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HeroCard } from './HeroCard';

describe('HeroCard', () => {
  const title = 'Test Title';
  const content = 'Test Content';
  const actionContent = 'Test Action Content';
  const backgroundColor = '#444BACF2';

  it('renders HeroCard with actionContent', () => {
    render(
      <HeroCard
        title={title}
        content={content}
        actionContent={actionContent}
        backgroundColor={backgroundColor}
        href="/"
      />,
    );

    // Assert title, content, and actionContent are rendered
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(actionContent)).toBeInTheDocument();
  });

  it('renders HeroCard with a link when actionContent is provided', () => {
    render(
      <HeroCard
        title={title}
        content={content}
        actionContent={actionContent}
        backgroundColor={backgroundColor}
        href="/"
      />,
    );

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders HeroCard without actionContent', () => {
    render(<HeroCard title={title} content={content} backgroundColor={backgroundColor} href="/" />);

    // Assert title and content are rendered
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();

    // Assert actionContent is not rendered
    expect(screen.queryByText(actionContent)).toBeNull();
  });

  it('renders HeroCard with a link when actionContent is not provided', () => {
    render(<HeroCard title={title} content={content} backgroundColor={backgroundColor} href="/" />);

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });
});
