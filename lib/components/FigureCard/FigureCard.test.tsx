import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { FigureCard } from './FigureCard';

afterEach(() => {
  cleanup();
});

describe('FigureCard', () => {
  const content = 'Lorem ipsum';
  const caption = 'Dolor sit amet';

  it('renders the content and the caption', () => {
    render(<FigureCard content={content} caption={caption} />);
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText(caption)).toBeInTheDocument();
    expect(screen.getByRole('figure')).toMatchSnapshot();
  });
});
