import { afterEach, describe, expect, it, test } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { RoundLinkButton } from './RoundLinkButton';

afterEach(() => {
  cleanup();
});

const DummyLink = () => {
  return <a href="/#">label</a>;
};

describe('Snapshot testing', () => {
  test('Default', () => {
    const { container } = render(<RoundLinkButton component={() => <DummyLink />} label="Default" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('selected', () => {
    const { container } = render(<RoundLinkButton component={() => <DummyLink />} label="Selected" selected={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, selected', () => {
    const { container } = render(
      <RoundLinkButton component={() => <DummyLink />} label="Disabled, nonselected" selected={true} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, non-selected', () => {
    const { container } = render(<RoundLinkButton component={() => <DummyLink />} label="Disabled, nonselected" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, selected', () => {
    const { container } = render(
      <RoundLinkButton component={() => <DummyLink />} label="Disabled, nonselected" selected={true} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('has the correct label', () => {
  render(<RoundLinkButton component={() => <DummyLink />} label="Label" />);
  expect(screen.getByRole('link', { name: 'label' })).not.toBeNull();
});
