import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './Tooltip';
import { TooltipContent } from './TooltipContent';
import { TooltipTrigger } from './TooltipTrigger';

describe('Tooltip', () => {
  it('emits data-testid for trigger and content (including arrow)', () => {
    render(
      <Tooltip open={true}>
        <TooltipTrigger testId="tt">Trigger</TooltipTrigger>
        <TooltipContent testId="tc">Tip</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByTestId('tt')).toBeInTheDocument();
    expect(screen.getByTestId('tc')).toBeInTheDocument();
    expect(screen.getByTestId('tc-arrow')).toBeInTheDocument();
  });

  it('applies data-testid to underlying element when using asChild', () => {
    render(
      <Tooltip open={true}>
        <TooltipTrigger asChild testId="tt2">
          <button type="button">child</button>
        </TooltipTrigger>
        <TooltipContent testId="tc2">Tip</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByTestId('tt2')).toBeInTheDocument();
    expect(screen.getByTestId('tc2')).toBeInTheDocument();
    expect(screen.getByTestId('tc2-arrow')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Tip</TooltipContent>
      </Tooltip>,
    );
    // Disable aria-command-name rule for floating-ui's focus guard spans which have
    // role="button" without an accessible name. Known floating-ui library issue.
    expect(await axe(container, { rules: { 'aria-command-name': { enabled: false } } })).toHaveNoViolations();
  });
});
