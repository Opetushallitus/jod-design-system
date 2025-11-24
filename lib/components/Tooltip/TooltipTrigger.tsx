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
    toggleOnClick?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
  }
>(function TooltipTrigger({ children, open, asChild = false, ariaLabel, toggleOnClick = false, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (children as { ref: React.ForwardedRef<HTMLElement> }).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  const { testId, onClick, ...rest } = props as {
    testId?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
  } & React.HTMLProps<HTMLElement>;

  // Build a unified onClick based on toggle flag (non-asChild branch uses it directly)
  const baseToggleHandler: React.MouseEventHandler<HTMLElement> | undefined = toggleOnClick
    ? (e) => {
        onClick?.(e);
        context.setOpen(!context.open);
      }
    : onClick;

  if (asChild && React.isValidElement(children)) {
    // Extract any onClick already on the child
    const childOnClick = (children.props as { onClick?: React.MouseEventHandler<HTMLElement> }).onClick;

    // Compose child + trigger handlers
    let finalOnClick: React.MouseEventHandler<HTMLElement> | undefined;
    if (toggleOnClick) {
      finalOnClick = (e) => {
        childOnClick?.(e);
        onClick?.(e);
        context.setOpen(!context.open);
      };
    } else if (childOnClick && onClick) {
      finalOnClick = (e) => {
        childOnClick(e);
        onClick(e);
      };
    } else {
      finalOnClick = onClick || childOnClick;
    }

    const merged = {
      ...rest,
      ref,
      onClick: finalOnClick,
      ...(testId ? { 'data-testid': testId } : {}),
      'aria-expanded': context.open,
      'aria-label': ariaLabel,
    } as React.HTMLProps<HTMLElement> & { 'data-testid'?: string };

    return React.cloneElement(children, context.getReferenceProps(merged));
  }

  return (
    <button
      aria-label={ariaLabel}
      ref={ref}
      {...context.getReferenceProps({ ...rest, onClick: baseToggleHandler })}
      data-testid={testId}
      className="ds:cursor-pointer"
      aria-expanded={context.open}
      type="button"
    >
      {children}
    </button>
  );
});
