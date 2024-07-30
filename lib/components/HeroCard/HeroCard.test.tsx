import '@testing-library/jest-dom';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

  it('renders the arrow by default if either href or actionContent is present', () => {
    const defaultProps = { title, content, backgroundColor };
    const { rerender } = render(<HeroCard {...defaultProps} />);

    // Assert arrow is not rendered
    expect(document.querySelector('svg')).toBeNull();

    // Assert arrow is rendered when href is provided
    rerender(<HeroCard {...defaultProps} href="/" />);
    expect(document.querySelector('svg')).not.toBeNull();

    // Assert arrow is rendered when actionContent is provided
    rerender(<HeroCard {...defaultProps} actionContent={actionContent} />);
    expect(document.querySelector('svg')).not.toBeNull();
  });

  it('renders HeroCard with a link when size is sm', () => {
    render(<HeroCard title={title} content={content} backgroundColor={backgroundColor} href="/" size="sm" />);

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('handles link clicks normally when onClick is not provided', () => {
    render(<HeroCard title={title} content={content} backgroundColor={backgroundColor} href="/" size="sm" />);

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    const clickEvent = createEvent.click(linkElement);
    fireEvent(linkElement, clickEvent);
    expect(clickEvent.defaultPrevented).toBe(false);
  });

  it('prevents the default link click event when onclick is passed', () => {
    const onClick = vi.fn();
    render(
      <HeroCard
        title={title}
        content={content}
        backgroundColor={backgroundColor}
        href="/"
        size="sm"
        onClick={onClick}
      />,
    );

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();

    const clickEvent = createEvent.click(linkElement);
    fireEvent(linkElement, clickEvent);
    expect(onClick).toHaveBeenCalled();
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});
