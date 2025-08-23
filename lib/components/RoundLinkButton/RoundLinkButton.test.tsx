import { render, screen } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';

import { RoundLinkButton } from './RoundLinkButton';

const DummyLink = ({ children, ...rootProps }: { children: React.ReactNode }) => {
  return (
    <a href="/#" {...rootProps}>
      {children}
    </a>
  );
};

describe('Snapshot testing', () => {
  test('Default', () => {
    const { container } = render(
      <RoundLinkButton component={(props) => <DummyLink {...props} />} label="Default" icon="target" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('selected', () => {
    const { container } = render(
      <RoundLinkButton
        component={(props) => <DummyLink {...props} />}
        label="Selected"
        selected={true}
        icon="target"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, selected', () => {
    const { container } = render(
      <RoundLinkButton
        component={(props) => <DummyLink {...props} />}
        label="Disabled, nonselected"
        selected={true}
        icon="target"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, non-selected', () => {
    const { container } = render(
      <RoundLinkButton component={(props) => <DummyLink {...props} />} label="Disabled, nonselected" icon="target" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, selected', () => {
    const { container } = render(
      <RoundLinkButton
        component={(props) => <DummyLink {...props} />}
        label="Disabled, nonselected"
        selected={true}
        icon="target"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('has the correct label', () => {
  render(<RoundLinkButton component={(props) => <DummyLink {...props} />} label="label" icon="target" />);
  expect(screen.getByRole('link', { name: 'label' })).not.toBeNull();
});

it('renders with data-testid when provided', () => {
  render(
    <RoundLinkButton component={(props) => <DummyLink {...props} />} label="Has id" icon="target" dataTestId="rlbtn" />,
  );
  expect(screen.getByTestId('rlbtn')).toBeInTheDocument();
});
