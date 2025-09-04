import { useMergeRefs } from '@floating-ui/react';
import React from 'react';
import { useTooltipContext } from './utils';

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & {
    asChild?: boolean;
    children: React.ReactNode | { ref: React.ForwardedRef<HTMLElement> };
    dataTestId?: string;
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

  // Extract dataTestId so we don't leak it as an unknown DOM attribute ("datatestid")
  const { dataTestId, ...rest } = props as { dataTestId?: string } & React.HTMLProps<HTMLElement>;

  if (asChild && React.isValidElement(children)) {
    const merged = {
      ...rest,
      ref,
      ...(dataTestId ? { 'data-testid': dataTestId } : {}),
    } as React.HTMLProps<HTMLElement> & { 'data-testid'?: string };
    return React.cloneElement(children, context.getReferenceProps(merged));
  }

  return (
    <button
      aria-label={ariaLabel}
      ref={ref}
      {...context.getReferenceProps(rest)}
      data-testid={dataTestId}
      className="ds:cursor-pointer"
      aria-expanded={open}
    >
      {children}
    </button>
  );
});
