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
      ...rest
    } = props;

    return (
      <FloatingPortal>
        <FloatingFocusManager
          // eslint-disable-next-line react-hooks/refs
          context={tooltipContext.context}
          modal={false}
          initialFocus={initialFocus}
          closeOnFocusOut={closeOnFocusOut}
        >
          <div
            aria-hidden="true"
            role="tooltip"
            className={cx([
              'ds:max-w-[280px]',
              'ds:sm:max-w-[320px]',
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
              // eslint-disable-next-line react-hooks/refs
              ref={tooltipContext.arrowRef}
              // eslint-disable-next-line react-hooks/refs
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
