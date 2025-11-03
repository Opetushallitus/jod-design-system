import { useMergeRefs } from '@floating-ui/react';
import React from 'react';
import { useTooltipContext } from './utils';

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & {
    asChild?: boolean;
    children: React.ReactNode | { ref: React.ForwardedRef<HTMLElement> };
    testId?: string;
    ariaLabel?: string;
    open?: boolean;
  }
>(function TooltipTrigger({ children, open, asChild = false, ariaLabel, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (
    children as {
      ref: React.ForwardedRef<HTMLElement>;
    }
  ).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  const { testId, ...rest } = props as { testId?: string } & React.HTMLProps<HTMLElement>;

  if (asChild && React.isValidElement(children)) {
    const merged = {
      ...rest,
      ref,
      ...(testId ? { 'data-testid': testId } : {}),
    } as React.HTMLProps<HTMLElement> & { 'data-testid'?: string };
    return React.cloneElement(children, context.getReferenceProps(merged));
  }

  return (
    <button
      aria-label={ariaLabel}
      ref={ref}
      {...context.getReferenceProps(rest)}
      data-testid={testId}
      className="ds:cursor-pointer"
      aria-expanded={open}
    >
      {children}
    </button>
  );
});
