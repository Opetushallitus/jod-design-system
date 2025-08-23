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

  if (asChild && React.isValidElement(children)) {
    const merged = {
      ...props,
      ref,
    } as React.HTMLProps<HTMLElement> & TestIdProps;
    // ensure DOM gets data-testid attr when provided
    const withTestId = props.dataTestId ? { ...merged, 'data-testid': props.dataTestId } : merged;
    return React.cloneElement(children, context.getReferenceProps(withTestId));
  }

  return (
    <button ref={ref} {...context.getReferenceProps(props)} className="ds:cursor-pointer">
      {children}
    </button>
  );
});
