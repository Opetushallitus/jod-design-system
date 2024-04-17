import React from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { useTooltipContext } from './utils';

export const TooltipTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & { asChild?: boolean }>(
  function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
    const context = useTooltipContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
        }),
      );
    }

    return (
      <button ref={ref} {...context.getReferenceProps(props)}>
        {children}
      </button>
    );
  },
);
