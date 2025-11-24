import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AiInfoButton } from './AiInfoButton';

describe('AiInfoButton', () => {
  it('renders the button with tooltip', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AiInfoButton ariaLabel="Info button" tooltipContent={<p>Hello.</p>} testId="aiinfo" />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('aiinfo')).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText('Hello.')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the icon only', () => {
    const { container } = render(<AiInfoButton />);
    const button = screen.queryByRole('button');
    expect(button).toBeNull();
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
