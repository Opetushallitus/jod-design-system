import { useMergeRefs } from '@floating-ui/react';
import React from 'react';
import { useTooltipContext } from './utils';

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & {
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
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children as React.ReactElement<object>).props,
      }),
    );
  }

  return (
    <button ref={ref} {...context.getReferenceProps(props)} className="ds:cursor-pointer">
      {children}
    </button>
  );
});
