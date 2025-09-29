import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, test, vi } from 'vitest';

import { RadioButton } from './RadioButton';
import { RadioButtonGroup } from './RadioButtonGroup';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <RadioButtonGroup label="Label" value="a" onChange={vi.fn()} dataTestId="rbg">
      {children}
    </RadioButtonGroup>
  );
};

describe('Snapshot testing', () => {
  test('Default', () => {
    const { container } = render(
      <Wrapper>
        <RadioButton label="A" value="a" dataTestId="rb" />
      </Wrapper>,
    );
    expect(screen.getByTestId('rbg')).toBeInTheDocument();
    expect(screen.getByTestId('rbg-label')).toBeInTheDocument();
    expect(screen.getByTestId('rb')).toBeInTheDocument();
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
