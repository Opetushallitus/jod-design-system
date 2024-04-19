import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Expander } from './Expander';

describe('Snapshot testing', () => {
  test('Base button', () => {
    const { container } = render(
      <Expander label="Label" description="Description">
        content
      </Expander>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Expander', () => {
  test('renders label and description correctly', () => {
    const label = 'Test Label';
    const description = 'Test Description';
    render(<Expander label={label} description={description} />);

    const labelElement = screen.getByText(label);
    const descriptionElement = screen.getByText(description);

    expect(labelElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('expands and collapses on button click', async () => {
    const user = userEvent.setup();
    const label = 'Test Label';
    const description = 'Test Description';
    render(<Expander label={label} description={description} />);

    const button = screen.getByRole('button');
    expect(screen.queryByRole('region')).toBeNull();

    await user.click(button);
    expect(screen.getByRole('region')).not.toBeNull();
    await user.click(button);

    expect(screen.queryByRole('region')).toBeNull();
  });
});
