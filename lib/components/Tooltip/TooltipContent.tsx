import { FloatingArrow, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import React from 'react';
import { tidyClasses } from '../../utils';
import { ARROW_HEIGHT, useTooltipContext } from './utils';

type TooltipContentProps = React.HTMLProps<HTMLDivElement> & {
  arrowClassName?: string;
  testId?: string;
};
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(props, propRef) {
    const tooltipContext = useTooltipContext();
    const ref = useMergeRefs([tooltipContext.refs.setFloating, propRef]);

    if (!tooltipContext.open) {
      return null;
    }

    const { testId, arrowClassName, ...rest } = props;

    return (
      <FloatingPortal>
        <div
          aria-hidden="true"
          role="tooltip"
          className={tidyClasses([
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
            className={arrowClassName ?? 'ds:fill-primary-gray'}
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
            data-testid={testId ? `${testId}-arrow` : undefined}
          />
        </div>
      </FloatingPortal>
    );
  },
);
