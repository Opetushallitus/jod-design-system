import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { TextCard } from './TextCard';

afterEach(() => {
  cleanup();
});

describe('TextCard', () => {
  const text = 'Lorem ipsum';
  const label = 'Dolor sit amet';

  it('renders the text and the label', () => {
    const { container } = render(<TextCard text={text} label={label} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
