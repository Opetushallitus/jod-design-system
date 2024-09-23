import '@testing-library/jest-dom';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HeroCard, HeroCardProps } from './HeroCard';

describe('HeroCard', () => {
  const title = 'Test Title';
  const content = 'Test Content';
  const actionContent = 'Test Action Content';
  const backgroundColor = '#444BACF2';

  it('renders HeroCard with actionContent', () => {
    render(
      <HeroCard
        to="/"
        linkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        title={title}
        content={content}
        actionContent={actionContent}
        backgroundColor={backgroundColor}
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
        to="/"
        linkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        title={title}
        content={content}
        actionContent={actionContent}
        backgroundColor={backgroundColor}
      />,
    );

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders HeroCard without actionContent', () => {
    render(
      <HeroCard
        to="/"
        linkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        title={title}
        content={content}
        backgroundColor={backgroundColor}
      />,
    );

    // Assert title and content are rendered
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();

    // Assert actionContent is not rendered
    expect(screen.queryByText(actionContent)).toBeNull();
  });

  it('renders the arrow by default if to and linkComponent and actionContent are present', () => {
    const defaultProps: HeroCardProps = {
      title,
      content,
      backgroundColor,
    };
    const { rerender } = render(<HeroCard {...defaultProps} />);

    // Assert arrow is not rendered
    expect(document.querySelector('svg')).toBeNull();

    // Assert arrow is rendered when href is provided
    rerender(
      <HeroCard
        {...defaultProps}
        to={'/'}
        linkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
      />,
    );
    expect(document.querySelector('svg')).not.toBeNull();

    // Assert arrow is rendered when actionContent is provided
    rerender(
      <HeroCard
        {...defaultProps}
        to={'/'}
        linkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        actionContent={actionContent}
      />,
    );
    expect(document.querySelector('svg')).not.toBeNull();
  });

  it('renders HeroCard with a link when size is sm', () => {
    render(
      <HeroCard
        to="/"
        linkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        title={title}
        content={content}
        backgroundColor={backgroundColor}
        size="sm"
      />,
    );

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('handles link clicks normally when onClick is not provided', () => {
    render(
      <HeroCard
        to="/"
        linkComponent={({ to, children }) => <a href={to as string}>{children}</a>}
        title={title}
        content={content}
        backgroundColor={backgroundColor}
        size="sm"
      />,
    );

    // Assert HeroCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    const clickEvent = createEvent.click(linkElement);
    fireEvent(linkElement, clickEvent);
    expect(clickEvent.defaultPrevented).toBe(false);
  });
});
