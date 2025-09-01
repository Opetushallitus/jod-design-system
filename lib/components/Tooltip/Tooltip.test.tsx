import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tooltip } from './Tooltip';
import { TooltipContent } from './TooltipContent';
import { TooltipTrigger } from './TooltipTrigger';

describe('Tooltip', () => {
  it('emits data-testid for trigger and content (including arrow)', () => {
    render(
      <Tooltip open={true}>
        <TooltipTrigger dataTestId="tt">Trigger</TooltipTrigger>
        <TooltipContent dataTestId="tc">Tip</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByTestId('tt')).toBeInTheDocument();
    expect(screen.getByTestId('tc')).toBeInTheDocument();
    expect(screen.getByTestId('tc-arrow')).toBeInTheDocument();
  });

  it('applies data-testid to underlying element when using asChild', () => {
    render(
      <Tooltip open={true}>
        <TooltipTrigger asChild dataTestId="tt2">
          <button type="button">child</button>
        </TooltipTrigger>
        <TooltipContent dataTestId="tc2">Tip</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByTestId('tt2')).toBeInTheDocument();
    expect(screen.getByTestId('tc2')).toBeInTheDocument();
    expect(screen.getByTestId('tc2-arrow')).toBeInTheDocument();
  });
});
