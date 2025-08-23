import { useMergeRefs } from '@floating-ui/react';
import React from 'react';
import type { TestIdProps } from '../../utils';
import { useTooltipContext } from './utils';

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  (React.HTMLProps<HTMLElement> & TestIdProps) & {
    asChild?: boolean;
    children: React.ReactNode | { ref: React.ForwardedRef<HTMLElement> };
  }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (
    children as {
      ref: React.ForwardedRef<HTMLElement>;
    }
  ).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // Extract dataTestId so we don't leak it as an unknown DOM attribute ("datatestid")
  const { dataTestId, ...rest } = props as TestIdProps & React.HTMLProps<HTMLElement>;

  if (asChild && React.isValidElement(children)) {
    const merged = {
      ...rest,
      ref,
      ...(dataTestId ? { 'data-testid': dataTestId } : {}),
    } as React.HTMLProps<HTMLElement> & TestIdProps & { 'data-testid'?: string };
    return React.cloneElement(children, context.getReferenceProps(merged));
  }

  return (
    <button ref={ref} {...context.getReferenceProps(rest)} data-testid={dataTestId} className="ds:cursor-pointer">
      {children}
    </button>
  );
});
