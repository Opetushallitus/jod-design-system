import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, test, vi } from 'vitest';
import { RadioButtonGroup } from './RadioButtonGroup';
import { RadioButton } from './RadioButton';
import '@testing-library/jest-dom/vitest';
import React from 'react';

afterEach(() => {
  cleanup();
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <RadioButtonGroup label="Label" value="a" onChange={vi.fn()}>
      {children}
    </RadioButtonGroup>
  );
};

describe('Snapshot testing', () => {
  test('Default', () => {
    const { container } = render(
      <Wrapper>
        <RadioButton label="A" value="a" />
      </Wrapper>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('RadioButton', () => {
  it('renders the label correctly', () => {
    render(
      <Wrapper>
        <RadioButton label="A" value="a" />
      </Wrapper>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
