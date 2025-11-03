import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InputHelp } from './InputHelp';

describe('InputHelp', () => {
  const helpText = 'This is some helpful text';
  const id = 'help-text';

  it('renders help text correctly', () => {
    const { getByText, container } = render(<InputHelp helpText={helpText} id={id} />);
    expect(getByText(helpText)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('does not render when helpText is undefined', () => {
    const { container } = render(<InputHelp id={id} />);
    expect(container).toBeEmptyDOMElement();
    expect(container).toMatchSnapshot();
  });

  it('applies the provided id to the help text element', () => {
    const { getByText, container } = render(<InputHelp helpText={helpText} id={id} />);
    expect(getByText(helpText)).toHaveAttribute('id', id);
    expect(container).toMatchSnapshot();
  });

  it('applies the provided testId to the help text element', () => {
    const testId = 'custom-help-text';
    const { getByTestId, container } = render(<InputHelp helpText={helpText} id={id} testId={testId} />);
    expect(getByTestId(testId)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
