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
    noAriaDescribedby?: boolean;
    noAriaExpanded?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
  }
  // eslint-disable-next-line sonarjs/cognitive-complexity
>(function TooltipTrigger(
  {
    children,
    open,
    asChild = false,
    ariaLabel,
    toggleOnClick = false,
    noAriaDescribedby = false,
    noAriaExpanded = false,
    ...props
  },
  propRef,
) {
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

  // According to testers, because our tooltips are most often triggered by hover or focus and
  // not via click or button press, and because the tooltip does not exist hidden in the DOM,
  // the "aria-describedby" (which is automatically added by floating-ui/react) should not be  added.
  const defaultAriaDescribedby = context.getReferenceProps()[
    'aria-describedby'
  ] as React.HTMLProps<HTMLElement>['aria-describedby'];
  const ariaDescribedby = noAriaDescribedby ? undefined : defaultAriaDescribedby;

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
      'aria-expanded': noAriaExpanded ? undefined : context.open,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
    } as React.HTMLProps<HTMLElement> & { 'data-testid'?: string };

    // eslint-disable-next-line react-hooks/refs
    return React.cloneElement(children, context.getReferenceProps(merged));
  }

  return (
    <button
      aria-label={ariaLabel}
      ref={ref}
      {...context.getReferenceProps({ ...rest, onClick: baseToggleHandler })}
      aria-describedby={ariaDescribedby}
      data-testid={testId}
      className="ds:cursor-pointer"
      aria-expanded={noAriaExpanded ? undefined : context.open}
      type="button"
    >
      {children}
    </button>
  );
});
