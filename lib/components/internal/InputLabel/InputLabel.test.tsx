import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InputLabel } from './InputLabel';

describe('InputLabel', () => {
  const labelText = 'Test Label';
  const htmlFor = 'test-input';

  it('renders label correctly', () => {
    const { getByText, container } = render(<InputLabel htmlFor={htmlFor} labelText={labelText} />);
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('hides label when hideLabel is true', () => {
    const { getByText, container } = render(<InputLabel htmlFor={htmlFor} labelText={labelText} hideLabel={true} />);
    const labelElement = getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('ds:hidden');
    expect(container).toMatchSnapshot();
  });
  it('applies the provided htmlFor to the label element', () => {
    const { getByText, container } = render(<InputLabel htmlFor={htmlFor} labelText={labelText} />);
    expect(getByText('Test Label')).toHaveAttribute('for', htmlFor);
    expect(container).toMatchSnapshot();
  });
  it('renders without labelText', () => {
    const { container } = render(<InputLabel htmlFor={htmlFor} />);
    expect(container).toMatchSnapshot();
  });
});
