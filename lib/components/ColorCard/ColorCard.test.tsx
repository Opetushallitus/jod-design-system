import { afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ColorCard } from './ColorCard';

afterEach(() => {
  cleanup();
});

describe('ColorCard', () => {
  const title = 'Test Title';
  const content = 'Test Content';
  const actionContent = 'Test Action Content';
  const backgroundColor = '#444BACF2';

  it('renders ColorCard with actionContent', () => {
    render(
      <ColorCard title={title} content={content} actionContent={actionContent} backgroundColor={backgroundColor} />,
    );

    // Assert title, content, and actionContent are rendered
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(actionContent)).toBeInTheDocument();
  });

  it('renders ColorCard with a link when actionContent is provided', () => {
    render(
      <ColorCard title={title} content={content} actionContent={actionContent} backgroundColor={backgroundColor} />,
    );

    // Assert ColorCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders ColorCard without actionContent', () => {
    render(<ColorCard title={title} content={content} backgroundColor={backgroundColor} />);

    // Assert title and content are rendered
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();

    // Assert actionContent is not rendered
    expect(screen.queryByText(actionContent)).toBeNull();
  });

  it('renders ColorCard with a link when actionContent is not provided', () => {
    render(<ColorCard title={title} content={content} backgroundColor={backgroundColor} />);

    // Assert ColorCard is wrapped in a link
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });
});
