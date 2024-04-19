import { render, screen } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import type { ReactNode } from 'react';

import { RadioButtonGroup } from './RadioButtonGroup';
import { RadioButton } from './RadioButton';

const Wrapper = ({ children }: { children: ReactNode }) => {
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
