import { FloatingArrow, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import React from 'react';
import type { TestIdProps } from '../../utils';
import { ARROW_HEIGHT, useTooltipContext } from './utils';

type TooltipContentProps = (React.HTMLProps<HTMLDivElement> & TestIdProps) & {
  arrowClassName?: string;
};
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(props, propRef) {
    const tooltipContext = useTooltipContext();
    const ref = useMergeRefs([tooltipContext.refs.setFloating, propRef]);

    if (!tooltipContext.open) {
      return null;
    }

    return (
      <FloatingPortal>
        <div
          className="ds:max-w-[292px] ds:rounded ds:bg-black ds:px-6 ds:py-5 ds:text-body-sm ds:font-arial ds:text-white ds:sm:text-body-md"
          ref={ref}
          style={{
            ...tooltipContext.floatingStyles,
          }}
          data-testid={props.dataTestId}
          {...tooltipContext.getFloatingProps(props)}
        >
          {props.children}
          <FloatingArrow
            ref={tooltipContext.arrowRef}
            context={tooltipContext.context}
            className={props.arrowClassName ?? 'ds:fill-black'}
            width={ARROW_HEIGHT * 2}
            height={ARROW_HEIGHT}
            data-testid={props.dataTestId ? `${props.dataTestId}-arrow` : undefined}
          />
        </div>
      </FloatingPortal>
    );
  },
);
