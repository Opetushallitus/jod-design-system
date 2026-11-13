import {
  FloatingArrow,
  FloatingFocusManager,
  type FloatingFocusManagerProps,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import React from 'react';

import { cx } from '../../cva';
import { ARROW_HEIGHT, useTooltipContext } from './utils';

type TooltipContentProps = React.HTMLProps<HTMLDivElement> & {
  testId?: string;
  initialFocus?: FloatingFocusManagerProps['initialFocus'];
  closeOnFocusOut?: FloatingFocusManagerProps['closeOnFocusOut'];
  /**
   * Keeps the portaled tooltip in the tab order right after the trigger, so that focusable
   * content inside it can be reached with Tab. This needs Floating UI's focus guards: focusable
   * `aria-hidden` elements that axe reports as `aria-hidden-focus`. A tooltip has no focusable
   * content by default, so the guards are only rendered when `initialFocus` moves focus into
   * the tooltip, unless this is set explicitly.
   */
  preserveTabOrder?: boolean;
};
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(props, propRef) {
    const tooltipContext = useTooltipContext();
    const ref = useMergeRefs([tooltipContext.refs.setFloating, propRef]);
    const [isReady, setIsReady] = React.useState(false);

    // Use layout effect to ensure position is calculated before showing
    React.useLayoutEffect(() => {
      if (tooltipContext.open && tooltipContext.x != null && tooltipContext.y != null) {
        // Small delay to ensure styles are applied
        const timer = requestAnimationFrame(() => {
          setIsReady(true);
        });
        return () => cancelAnimationFrame(timer);
      } else {
        setIsReady(false);
      }
    }, [tooltipContext.open, tooltipContext.x, tooltipContext.y]);

    if (!tooltipContext.open) {
      return null;
    }

    const {
      testId,
      closeOnFocusOut = true, // Close tooltip when focus moves outside
      initialFocus = -1, // Don't focus any element inside the tooltip by default
      preserveTabOrder = initialFocus !== -1,
      ...rest
    } = props;

    return (
      <FloatingPortal preserveTabOrder={preserveTabOrder}>
        <FloatingFocusManager
          context={tooltipContext.context}
          modal={false}
          initialFocus={initialFocus}
          closeOnFocusOut={closeOnFocusOut}
          guards={preserveTabOrder}
        >
          <div
            aria-hidden="true"
            role="tooltip"
            className={cx([
              'ds:max-w-[280px]',
              'ds:sm:max-w-xs',
              'ds:rounded',
              'ds:p-4',
              'ds:bg-primary-gray',
              'ds:text-body-xs',
              'ds:font-arial',
              'ds:text-white',
              'ds:z-50',
            ])}
            ref={ref}
            style={{
              ...tooltipContext.floatingStyles,
              // Hide completely until positioned
              visibility: isReady ? 'visible' : 'hidden',
            }}
            data-testid={testId}
            {...tooltipContext.getFloatingProps(rest)}
          >
            {props.children}
            <FloatingArrow
              ref={tooltipContext.arrowRef}
              context={tooltipContext.context}
              className="ds:fill-primary-gray"
              width={ARROW_HEIGHT * 2}
              height={ARROW_HEIGHT}
              data-testid={testId ? `${testId}-arrow` : undefined}
            />
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
